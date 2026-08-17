export default function VideoSection() {
  return (
    <section className="videosec">
      <div className="video-wrap">
        <iframe
          src="https://www.youtube.com/embed/mLfD3xYs3WY?rel=0&modestbranding=1"
          title="Las 10 señales de que estás en automático"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
