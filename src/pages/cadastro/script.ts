import '@/style.css'
import './styles.css'

const fisica = document.getElementById("pFisica")
const juridica = document.getElementById("pJuridica")
const parceiro = document.getElementById("parceiro")

parceiro?.addEventListener("click",() => navigate("parceiro"))
juridica?.addEventListener("click",() => navigate("juridica"))
fisica?.addEventListener("click",() => navigate("fisica"))


const navigate = (page:string) => {
  window.location.href = `./${page}/index.html`
}