type ArtifactCardProps = {
  title: string;
  body: string;
};

export function ArtifactCard({ title, body }: ArtifactCardProps) {
  return (
    <section className="artifact-card">
      <div className="artifact-card__header">
        <p className="artifact-card__eyebrow">Generated asset</p>
        <h2>{title}</h2>
      </div>
      <pre>{body}</pre>
    </section>
  );
}

