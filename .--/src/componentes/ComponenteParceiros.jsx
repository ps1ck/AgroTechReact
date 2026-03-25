import { useState } from "react";

const parceirosExistentes = [
  {
    id: 1,
    nome: "João Farm",
    cnpj: "00.000.000/0000-1",
    cidade: "São Paulo",
    estado: "SP",
    servico: "Fornecimento de insumos",
    url: "#",
  },
  {
    id: 2,
    nome: "Fazenda do Morango",
    cnpj: "00.000.000/0000-1",
    cidade: "Florianópolis",
    estado: "SC",
    servico: "Fornecimento de insumos",
    url: "#",
  },
  {
    id: 3,
    nome: "Stark`s Motors",
    cnpj: "00.000.000/0000-1",
    cidade: "Porto Alegre",
    estado: "RS",
    servico: "Equipamentos agrícolas",
    url: "#",
  },
  {
    id: 4,
    nome: "AgroVerde Soluções",
    cnpj: "00.000.000/0000-2",
    cidade: "Ribeirão Preto",
    estado: "SP",
    servico: "Consultoria agrícola",
    url: "#",
  },
  {
    id: 5,
    nome: "Campo Fertil Ltda",
    cnpj: "00.000.000/0000-3",
    cidade: "Uberlândia",
    estado: "MG",
    servico: "Sementes e defensivos",
    url: "#",
  },
];

const styles = {
  section: {
    background: "#000",
    padding: "80px 24px",
  },
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
    alignItems: "start",
  },
  columnTitle: {
    color: "#7ab648",
    fontSize: "clamp(1.4rem, 3vw, 2rem)",
    fontWeight: 900,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "24px",
    textAlign: "center"
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "32px",
  },
  fieldGroup: {
    marginBottom: "8px",
  },
  label: {
    display: "block",
    fontSize: "0.85rem",
    color: "#333",
    marginBottom: "6px",
    fontWeight: 600,
  },
  input: {
    width: "100%",
    background: "#c8dba5",
    border: "none",
    borderRadius: "50px",
    padding: "12px 18px",
    fontSize: "0.9rem",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
    transition: "box-shadow 0.2s",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  submitBtn: {
    display: "block",
    margin: "28px auto 0",
    background: "#4a8c1c",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "14px 40px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#c8dba5",
    borderRadius: "50px",
    padding: "10px 18px",
    marginBottom: "20px",
    gap: "8px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontSize: "0.95rem",
    color: "#444",
    outline: "none",
  },
  searchIcon: {
    color: "#555",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  listWrapper: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    maxHeight: "480px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  partnerCard: {
    background: "#c8dba5",
    borderRadius: "14px",
    padding: "16px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontWeight: 800,
    fontSize: "1rem",
    color: "#1a1a1a",
    marginBottom: "4px",
  },
  partnerMeta: {
    fontSize: "0.8rem",
    color: "#444",
    lineHeight: "1.6",
  },
  visitBtn: {
    background: "#4a8c1c",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    padding: "10px 22px",
    fontSize: "0.85rem",
    fontWeight: 700,
    cursor: "pointer",
    marginLeft: "16px",
    whiteSpace: "nowrap",
    transition: "background 0.2s",
    textDecoration: "none",
    display: "inline-block",
  },
  emptyMsg: {
    textAlign: "center",
    color: "#888",
    padding: "32px 0",
    fontSize: "0.9rem",
  },
  successMsg: {
    textAlign: "center",
    color: "#4a8c1c",
    fontWeight: 700,
    marginTop: "16px",
    fontSize: "0.95rem",
  },
};

function PartnerForm({ onSubmitSuccess }) {
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    cidade: "",
    estado: "",
    servico: "",
    email: "",
    telefone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const required = ["nome", "cnpj", "cidade", "estado", "servico", "email"];
    if (required.some((f) => !form[f].trim())) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    onSubmitSuccess && onSubmitSuccess(form);
    setSubmitted(true);
    setForm({ nome: "", cnpj: "", cidade: "", estado: "", servico: "", email: "", telefone: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputFocus = (e) => (e.target.style.boxShadow = "0 0 0 3px rgba(74,140,28,0.3)");
  const inputBlur = (e) => (e.target.style.boxShadow = "none");

  return (
    <div style={styles.card}>
      {(["nome", "cnpj"] ).map((field) => (
        <div key={field} style={styles.fieldGroup}>
          <label style={styles.label}>
            {field === "nome" ? "Nome da empresa" : "CNPJ"}
          </label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            onFocus={inputFocus}
            onBlur={inputBlur}
            style={styles.input}
            autoComplete="off"
          />
        </div>
      ))}

      <div style={{ ...styles.fieldGroup }}>
        <div style={styles.row}>
          <div>
            <label style={styles.label}>Cidade</label>
            <input
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              onFocus={inputFocus}
              onBlur={inputBlur}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Estado</label>
            <input
              name="estado"
              value={form.estado}
              onChange={handleChange}
              onFocus={inputFocus}
              onBlur={inputBlur}
              style={styles.input}
            />
          </div>
        </div>
      </div>

      {["servico", "email", "telefone"].map((field) => (
        <div key={field} style={styles.fieldGroup}>
          <label style={styles.label}>
            {field === "servico" ? "Tipo de serviço" : field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            onFocus={inputFocus}
            onBlur={inputBlur}
            style={styles.input}
            type={field === "email" ? "email" : "text"}
          />
        </div>
      ))}

      <button
        style={styles.submitBtn}
        onClick={handleSubmit}
        onMouseEnter={(e) => (e.target.style.background = "#3a7015")}
        onMouseLeave={(e) => (e.target.style.background = "#4a8c1c")}
      >
        Quero me tornar parceiro
      </button>

      {submitted && (
        <p style={styles.successMsg}>✅ Cadastro enviado com sucesso!</p>
      )}
    </div>
  );
}

function PartnerList({ partners }) {
  const [search, setSearch] = useState("");

  const filtered = partners.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.nome.toLowerCase().includes(q) ||
      p.servico.toLowerCase().includes(q) ||
      p.cidade.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div style={styles.searchWrapper}>
        <input
          style={styles.searchInput}
          placeholder="Empresa, Serviço ou Cidade"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span style={styles.searchIcon}>🔍</span>
      </div>
      <div style={styles.listWrapper}>
        {filtered.length === 0 ? (
          <p style={styles.emptyMsg}>Nenhum parceiro encontrado.</p>
        ) : (
          filtered.map((p) => (
            <div key={p.id} style={styles.partnerCard}>
              <div style={styles.partnerInfo}>
                <div style={styles.partnerName}>{p.nome}</div>
                <div style={styles.partnerMeta}>
                  CNPJ: {p.cnpj}
                  <br />
                  Cidade: {p.cidade} | {p.estado}
                  <br />
                  Serviços: {p.servico}
                </div>
              </div>
              <a
                href={p.url}
                style={styles.visitBtn}
                onMouseEnter={(e) => (e.target.style.background = "#3a7015")}
                onMouseLeave={(e) => (e.target.style.background = "#4a8c1c")}
              >
                Visitar
              </a>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default function PartnersSection() {
  const [partners, setPartners] = useState(parceirosExistentes);

  const handleNewPartner = (formData) => {
    setPartners((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: formData.nome,
        cnpj: formData.cnpj,
        cidade: formData.cidade,
        estado: formData.estado,
        servico: formData.servico,
        url: "#",
      },
    ]);
  };

  return (
    <section id="sejanossoparceiro" style={styles.section}>
      <div style={styles.inner}>
        {/* Coluna esquerda – Formulário */}
        <div>
          <h2 style={styles.columnTitle}>Seja nosso parceiro</h2>
          <PartnerForm onSubmitSuccess={handleNewPartner} />
        </div>

        {/* Coluna direita – Lista de parceiros */}
        <div>
          <h2 style={styles.columnTitle}>Nossos parceiros</h2>
          <PartnerList partners={partners} />
        </div>
      </div>
    </section>
  );
}
