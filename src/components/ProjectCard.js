"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, featured = false, index = 0, onPlayVideo }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation: center is (width/2, height/2)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = -((y - centerY) / centerY) * 5;
    const ry = ((x - centerX) / centerX) * 5;

    setCoords({ x, y });
    setTilt({ rx, ry });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.debug("Autoplay blocked:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Rewind to start
    }
  };

  const handleMediaClick = () => {
    if (project.video && onPlayVideo) {
      onPlayVideo(project.video, project.title);
    }
  };

  // Entry scroll animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: index * 0.08,
      },
    },
  };

  const dynamicStyle = {
    "--mouse-x": `${coords.x}px`,
    "--mouse-y": `${coords.y}px`,
    transform: isHovered
      ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.015, 1.015, 1.015)`
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      style={dynamicStyle}
      className={`${styles.card} ${featured ? styles.featured : ""} ${isHovered ? styles.cardHovered : ""}`}
    >
      {/* Background spotlight overlay */}
      <div className={styles.spotlight} />

      <div
        className={`${styles.imageArea} ${project.video ? styles.hasVideo : ""}`}
        onClick={handleMediaClick}
      >
        {/* Cover image or placeholder (visible by default) */}
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className={`${styles.image} ${project.video && isHovered ? styles.imageHidden : ""}`}
          />
        ) : (
          <div className={`${styles.placeholder} ${project.video && isHovered ? styles.imageHidden : ""}`}>
            <span className={styles.placeholderIcon}>🚀</span>
            <span className={styles.placeholderText}>Active AI System</span>
          </div>
        )}

        {/* Video overlay (preloads, plays, and fades in on hover) */}
        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            className={`${styles.video} ${isHovered ? styles.videoVisible : ""}`}
            loop
            muted
            playsInline
            preload="auto"
          />
        )}

        {/* Hover click expand banner overlay */}
        {project.video && (
          <div className={styles.videoOverlay}>
            <span className={styles.playIcon}>🔍 Click to Expand</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.category}>{project.category}</span>
          {project.status && (
            <span className={styles.status}>
              <span className={styles.pulseDot} />
              {project.status}
            </span>
          )}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techChip}>
              {t}
            </span>
          ))}
        </div>
        <div className={styles.links}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={15} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.demoLink}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
