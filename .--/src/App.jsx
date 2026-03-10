import AgrotechLogo from "./assets/Agrotech logo.png";
import LogoBranco from "./assets/Logo_agrotech_branca-removebg-preview.png";
import FotoArthur from "./assets/foto_arthur.JPG";
import FotoKevin from "./assets/foto_kevin.jpeg";
import FotoRenato from "./assets/foto_renato.jpg";
import FotoRian from "./assets/foto_rian.JPG";
import IconChamadaTelefonica from "./assets/chamada-telefonica.svg";
import IconEnvelope from "./assets/envelope.svg";
import IconInstagram from "./assets/instagram.svg";
import { useMemo, useState } from "react";

function App() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(() => {
    const nextErrors = {
      nome: !form.nome.trim(),
      email: !form.email.trim(),
      mensagem: !form.mensagem.trim(),
    };
    return nextErrors;
  }, [form.email, form.mensagem, form.nome]);

  const hasErrors = errors.nome || errors.email || errors.mensagem;

  return (
    <>
      <nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="#home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "white",
            }}
          >
            <img
              src={LogoBranco}
              alt="AgroTech"
              style={{ height: 44, width: "auto" }}
            />
            <span style={{ fontWeight: 600, letterSpacing: 0.2 }}>
              Agrotech
            </span>
          </a>

          <ul
            className="buttonsHome"
            style={{
              listStyle: "none",
              display: "flex",
              gap: 18,
              margin: 0,
              padding: 0,
              marginLeft: "auto",
            }}
          >
            <li>
              <a
                href="#sobre"
                style={{ color: "white", textDecoration: "none" }}
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="#produtos"
                style={{ color: "white", textDecoration: "none" }}
              >
                Produtos
              </a>
            </li>
            <li>
              <a
                href="#time"
                style={{ color: "white", textDecoration: "none" }}
              >
                Time
              </a>
            </li>
            <li>
              <a
                href="#contato"
                style={{ color: "white", textDecoration: "none" }}
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main" id="home">
        <h1 className="fs-1 mb-3" style={{ maxWidth: 800 }}>
          <strong>Agrotech</strong> é mais que uma startup, é o futuro do agro!
        </h1>
        <p className="fs-4 mb-5" style={{ maxWidth: 800 }}>
          Ela impulsiona a agricultura moderna com inovação, eficiência e
          sustentabilidade, aproximando o produtor rural da tecnologia do
          futuro.
        </p>
        <p className="fs-4 mb-5" style={{ maxWidth: 800 }}>
          Venha fazer parte desse novo mundo com a gente!
        </p>
        <button
          className="buttonLearnMore"
          id="buttonLearnMore"
          type="button"
          onClick={() => {
            const el = document.getElementById("sobre");
            if (!el) return;
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Saiba mais
        </button>
      </main>

      <section className="about" id="sobre">
        <div className="row w-100">
          <div className="col-lg-6 about-logo">
            <img
              src={AgrotechLogo}
              alt="Logo da Agrotech em Verde"
              width="70%"
              height="auto"
            />
          </div>
          <div className="col-lg-6 about-texto">
            <div className="row g-4">
              <div className="col-12">
                <p className="texto-superior">
                  SOMOS UMA STARTUP FUNDADA COM UM PROPÓSITO CLARO:{" "}
                  <span className="texto-verde">
                    TRANSFORMAR A VIDA DE QUEM TRABALHA DURO PARA ALIMENTAR O
                    MUNDO
                  </span>
                  . <br />
                  <br />
                </p>
              </div>
              <div className="col-12 texto-inferior">
                <p className="texto-inferior">
                  NA <span className="texto-verde"> AGROTECH</span>, ACREDITAMOS
                  QUE O FUTURO DO CAMPO NASCE DA INOVAÇÃO. DESENVOLVEMOS
                  SOLUÇÕES TECNOLÓGICAS QUE AUMENTAM A PRODUTIVIDADE, REDUZEM
                  CUSTOS E FACILITAM O DIA A DIA DOS AGRICULTORES. NOSSO
                  OBJETIVO É TORNAR O TRABALHO NO CAMPO MAIS EFICIENTE,
                  SUSTENTÁVEL E VALORIZADO, PORQUE QUEM CULTIVA O AMANHÃ MERECE
                  COLHER O MELHOR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="produtos" id="produtos">
        <h1>PRODUTOS</h1>
        <div className="cards">
          <div className="card basic">
            <h2>BASIC</h2>
            <ul>
              <li>App</li>
              <li>Aplicação</li>
            </ul>
            <button
              type="button"
              className="buttonLearnMore textoPequeno alinhaTudo"
            >
              AGENDE SEU HORÁRIO
            </button>
          </div>

          <div className="card premium">
            <h2>PREMIUM</h2>
            <ul>
              <li>App</li>
              <li>Aplicação</li>
              <li>
                Acompanhamento
                <br />
                (3 meses)
              </li>
            </ul>
            <button
              type="button"
              className="buttonLearnMore textoPequeno alinhaTudo"
            >
              AGENDE SEU HORÁRIO
            </button>
          </div>

          <div className="card deluxe">
            <h2>DELUXE</h2>
            <ul>
              <li>App</li>
              <li>Aplicação</li>
              <li>
                Acompanhamento
                <br />
                (12 meses)
              </li>
              <li>Site</li>
              <li>Consultoria de marca</li>
            </ul>
            <button
              type="button"
              className="buttonLearnMore textoPequeno alinhaTudo"
            >
              AGENDE SEU HORÁRIO
            </button>
          </div>
        </div>
      </section>

      <section className="time" id="time">
        <h1>TIME</h1>
        <div className="cards" id="cargos">
          <article className="card">
            <img
              src={FotoKevin}
              alt="Foto Kevin"
              className="foto-kevin"
              style={{ width: "100%", height: 260, objectFit: "cover" }}
            />
            <h3>Kevin Bortoleto</h3>
            <p>(Desenvolvedor)</p>
          </article>
          <article className="card">
            <img
              src={FotoRian}
              alt="Foto Rian"
              className="foto-rian"
              style={{ width: "100%", height: 260, objectFit: "cover" }}
            />
            <h3>Rian Mendonça</h3>
            <p>(Desenvolvedor)</p>
          </article>
          <article className="card">
            <img
              src={FotoArthur}
              alt="Foto Arthur"
              className="foto-arthur"
              style={{ width: "100%", height: 260, objectFit: "cover" }}
            />
            <h3>Arthur Machado</h3>
            <p>(Desenvolvedor)</p>
          </article>
          <article className="card">
            <img
              src={FotoRenato}
              alt="Foto Renato"
              className="foto-renato"
              style={{ width: "100%", height: 260, objectFit: "cover" }}
            />
            <h3>Renato Matsumoto</h3>
            <p>(Desenvolvedor)</p>
          </article>
        </div>
      </section>

      <section className="contato" id="contato">
        <h1>Contato</h1>
        <h3>
          Envie uma mensagem e a gente retorna em breve.{" "}
          <span className="texto-verde">Vamos conversar?</span>
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitAttempted(true);
            if (hasErrors) return;
            // Placeholder: integrate with your backend/email provider.
            setForm({ nome: "", email: "", mensagem: "" });
            setSubmitAttempted(false);
          }}
          style={{
            width: "min(720px, 92vw)",
            display: "grid",
            gap: 12,
          }}
        >
          <input
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, nome: e.target.value }))
            }
            className={submitAttempted && errors.nome ? "input-error" : ""}
            style={{ padding: 12, borderRadius: 10, border: "1px solid #333" }}
          />
          <input
            name="email"
            type="email"
            placeholder="Seu email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className={submitAttempted && errors.email ? "input-error" : ""}
            style={{ padding: 12, borderRadius: 10, border: "1px solid #333" }}
          />
          <textarea
            name="mensagem"
            placeholder="Sua mensagem"
            rows={6}
            value={form.mensagem}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, mensagem: e.target.value }))
            }
            className={submitAttempted && errors.mensagem ? "input-error" : ""}
            style={{ padding: 12, borderRadius: 10, border: "1px solid #333" }}
          />
          <button type="submit" className="buttonLearnMore">
            Enviar
          </button>
          <p className="textoPequeno">
            Ao enviar, voce concorda em ser contatado pela AgroTech.
          </p>
        </form>
      </section>

      <footer
        className="text-white py-4"
        style={{ backgroundColor: "#5cab4f" }}
      >
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-start">
            <p className="mb-1 d-flex align-items-center gap-2">
              <img
                src={IconChamadaTelefonica}
                alt="Telefone"
                className="footer-icon"
              />
              (11) 99760-0907
            </p>
            <p className="mb-1 d-flex align-items-center gap-2">
              <img
                src={IconInstagram}
                alt="Instagram"
                className="footer-icon"
              />
              @AGROTECH
            </p>
            <p className="mb-0 d-flex align-items-center gap-2">
              <img src={IconEnvelope} alt="Email" className="footer-icon" />
              faleconosco@agrotech.com.br
            </p>
          </div>
          <div className="text-center mt-3 mt-md-0">
            <img
              src={LogoBranco}
              alt="Logo Agrotech"
              width="60"
              className="mb-2"
            />
            <p className="mb-0 fw-bold">AGROTECH</p>
            <small>Design by Agrotech</small>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
