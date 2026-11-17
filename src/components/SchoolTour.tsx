"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type KeyboardEvent } from "react";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
};

const PlayIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor" /></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14M17 5v14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" /></svg>;
const VolumeIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10v4h4l5 4V6l-5 4H5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" /><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
const MutedIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10v4h4l5 4V6l-5 4H5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" /><path d="m18 9 4 6m0-6-4 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
const FullscreenIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;

export default function SchoolTour() {
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introTimerRef = useRef<number | null>(null);
  const coverTimerRef = useRef<number | null>(null);
  const controlsTimerRef = useRef<number | null>(null);
  const introTriggeredRef = useRef(false);
  const hasStartedRef = useRef(false);
  const userPausedRef = useRef(false);
  const endedRef = useRef(false);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const [introActive, setIntroActive] = useState(false);
  const [coverLeaving, setCoverLeaving] = useState(false);
  const [coverHidden, setCoverHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [touchDevice, setTouchDevice] = useState(false);

  const playVideo = useCallback(async (startMuted = false) => {
    const video = videoRef.current;
    if (!video) return false;
    if (startMuted) {
      video.muted = true;
      setMuted(true);
    }
    try {
      await video.play();
      hasStartedRef.current = true;
      userPausedRef.current = false;
      if (Number.isFinite(video.duration)) setDuration(video.duration);
      setPlaying(true);
      setNeedsPlay(false);
      return true;
    } catch {
      setPlaying(false);
      setNeedsPlay(true);
      return false;
    }
  }, []);

  const pauseVideo = useCallback((byUser = false) => {
    videoRef.current?.pause();
    if (byUser) userPausedRef.current = true;
    setPlaying(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (endedRef.current) {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        endedRef.current = false;
        setEnded(false);
        void playVideo();
      }
      return;
    }
    if (playing) {
      pauseVideo(true);
    } else {
      void playVideo();
    }
  }, [pauseVideo, playVideo, playing]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const handleProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);
    if (videoRef.current) videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (controlsTimerRef.current) window.clearTimeout(controlsTimerRef.current);
    if (!touchDevice && playing) {
      controlsTimerRef.current = window.setTimeout(() => setControlsVisible(false), 2500);
    }
  }, [playing, touchDevice]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === " " || event.key.toLowerCase() === "k") {
      event.preventDefault();
      togglePlayback();
    } else if (event.key.toLowerCase() === "m") {
      event.preventDefault();
      toggleMute();
    } else if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      void playerRef.current?.requestFullscreen();
    }
  };

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updatePreferences = () => {
      reducedMotionRef.current = motionQuery.matches;
      setReducedMotion(motionQuery.matches);
      setTouchDevice(touchQuery.matches);
    };
    updatePreferences();
    motionQuery.addEventListener("change", updatePreferences);
    touchQuery.addEventListener("change", updatePreferences);
    return () => {
      motionQuery.removeEventListener("change", updatePreferences);
      touchQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.intersectionRatio >= 0.35;
      visibleRef.current = visible;

      if (entry.intersectionRatio >= 0.4 && !introTriggeredRef.current) {
        introTriggeredRef.current = true;
        if (reducedMotionRef.current) {
          setCoverHidden(true);
        } else {
          setIntroActive(true);
          introTimerRef.current = window.setTimeout(() => {
            setCoverLeaving(true);
            void playVideo(true);
            coverTimerRef.current = window.setTimeout(() => setCoverHidden(true), 1100);
          }, 1900);
        }
      }

      if (!visible) {
        pauseVideo();
      } else if (hasStartedRef.current && !userPausedRef.current && !endedRef.current) {
        void playVideo();
      }
    }, { threshold: [0.35, 0.4] });
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (introTimerRef.current) window.clearTimeout(introTimerRef.current);
      if (coverTimerRef.current) window.clearTimeout(coverTimerRef.current);
    };
  }, [pauseVideo, playVideo]);

  useEffect(() => {
    return () => {
      if (controlsTimerRef.current) window.clearTimeout(controlsTimerRef.current);
    };
  }, []);

  return (
    <section className="tour-section" ref={sectionRef} aria-labelledby="school-tour-heading">
      <div className="section-wrap tour-heading">
        <h2 className="accent-heading" id="school-tour-heading">Take a walk through <span>GBHS</span></h2>
        <p>A look around our campus, our classrooms and our community.</p>
      </div>

      <div
        className={`tour-player${controlsVisible ? " tour-controls-visible" : ""}`}
        ref={playerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseMove={showControls}
        onMouseEnter={showControls}
        aria-label="GBHS school tour video player"
      >
        <video
          ref={videoRef}
          className="tour-video"
          src="/videos/gbhs-tour.mp4"
          muted={muted}
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => {
            setPlaying(true);
            showControls();
          }}
          onPause={() => setPlaying(false)}
          onEnded={(event) => {
            endedRef.current = true;
            setEnded(true);
            setPlaying(false);
            setCurrentTime(0);
            event.currentTarget.currentTime = 0;
          }}
          onClick={togglePlayback}
        />

        <div className={`tour-cover${introActive ? " tour-cover-intro" : ""}${coverLeaving ? " tour-cover-leaving" : ""}${coverHidden ? " tour-cover-hidden" : ""}`} aria-hidden={coverHidden}>
          <div className="tour-cover-content">
            <div className="tour-brand" aria-label="GBHS Bamenda">
              <span className="tour-brand-mark" aria-hidden="true">GBHS</span>
              <span><strong>GBHS Bamenda</strong><small>Government Bilingual High School</small></span>
            </div>
            <span className="tour-brand-line" aria-hidden="true" />
          </div>
        </div>

        {(needsPlay || (reducedMotion && !playing && !ended)) && (
          <button type="button" className="tour-big-play" onClick={() => void playVideo()} aria-label="Play school tour">
            <PlayIcon />
          </button>
        )}

        {muted && !ended && (
          <button type="button" className="tour-unmute" onClick={toggleMute}>
            <MutedIcon />
            <span>Sound off · Tap to unmute</span>
          </button>
        )}

        {ended && (
          <div className="tour-ended">
            <button type="button" className="tour-watch-again" onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              video.currentTime = 0;
              endedRef.current = false;
              setEnded(false);
              void playVideo();
            }}>
              <PlayIcon /> Watch again
            </button>
          </div>
        )}

        <div className="tour-controls" aria-hidden={ended}>
          <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause video" : "Play video"}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={handleProgress}
            aria-label="Video progress"
            style={{ "--tour-progress": `${duration ? (currentTime / duration) * 100 : 0}%` } as CSSProperties}
          />
          <span className="tour-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
          <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>
            {muted ? <MutedIcon /> : <VolumeIcon />}
          </button>
          <button type="button" onClick={() => void playerRef.current?.requestFullscreen()} aria-label="Enter fullscreen">
            <FullscreenIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
