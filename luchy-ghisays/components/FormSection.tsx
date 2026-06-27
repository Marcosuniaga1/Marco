import LeadForm from "./LeadForm";

export default function FormSection() {
  return (
    <section className="formwrap" id="form">
      <div className="formcard">
        <h2>Acceso inmediato al PDF</h2>
        <div className="tagline">Déjanos tus datos y te llega al instante.</div>
        <LeadForm variant="card" />
      </div>
    </section>
  );
}
