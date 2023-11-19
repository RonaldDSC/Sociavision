import "@/globalStyle.css";
import "./main.css";
import "bootstrap/dist/css/bootstrap-grid.min.css"; // importando Bootstrap-grid
import "bootstrap/dist/css/bootstrap.min.css"; // importando Bootstrap-css
import AutenticacaoRepositorio from "@/repositorios/autenticacao/autenticacaoRepositorio";
import { NavegacaoServico } from "@/servicos/navegacao/nav";
import { UrlServico } from "@/servicos/navegacao/url";
import { RotasServico } from "@/servicos/navegacao/rotas";
import LoadingComponente from "@/componentes/loading/loadingComponente";

RotasServico.rotaProtegida();

// Links
const login = document.getElementsByClassName("btn-login");
const cadastro = document.getElementsByClassName("btn-cadastro");
const sair = document.getElementById("temp-sair");

login[0].href = RotasServico.rotas["/login"];
cadastro[0].href = RotasServico.rotas["/cadastro"];

sair.addEventListener("click", async () => {
    const carregando = LoadingComponente(document.body);
    await new AutenticacaoRepositorio().sair();
    carregando.esconder();
});

// Cards

const cardPremium = document.getElementsByClassName("card-Premium");
const cardIntermediário = document.getElementsByClassName("card-Intermediário");
const cardBasico = document.getElementsByClassName("card-basico");

const btnCardBasico = cardBasico[0].getElementsByClassName("btn-card");
const btnCardIntermediario = cardIntermediário[0].getElementsByClassName("btn-card");
const btnCardPremium = cardPremium[0].getElementsByClassName("btn-card");

if (btnCardBasico[0]) {
    btnCardBasico[0].addEventListener("click", () => navegarPagamento("pb"));
}

if (btnCardIntermediario[0]) {
    btnCardIntermediario[0].addEventListener("click", () => navegarPagamento("pi"));
}

if (btnCardPremium[0]) {
    btnCardPremium[0].addEventListener("click", () => navegarPagamento("pp"));
}

async function navegarPagamento(nomeItem) {
    const loading = LoadingComponente(document.body);

    try {
        const { usuarioLogado } = new AutenticacaoRepositorio();
        const usuario = await usuarioLogado();
        const param = { item: nomeItem };

        console.log(usuario);
        if (usuario !== null) {
            NavegacaoServico.navegar("/pagamento", param);
        } else {
            NavegacaoServico.navegar("/login", {
                next: UrlServico.inserirParametros(RotasServico.rotas["/pagamento"], param),
            });
        }
    } catch (error) {
    } finally {
        loading.esconder();
    }
}

//Abrindo e Fechado Menu Mobile
var toggleMenu = document.querySelectorAll(".toggle-menu");
var menuMobile = document.querySelector(".nav-container-mob");
var btnMenuMobImg = document.querySelector(".btn-menu-mob ion-icon");

for (var m = 0; m < toggleMenu.length; m++) {
    toggleMenu[m].addEventListener("click", function () {
        var overlay = document.querySelector(".overlay");

        overlay.classList.toggle("open");
        menuMobile.classList.toggle("menu-is-close");
        menuMobile.classList.toggle("menu-is-open");

        var icon = btnMenuMobImg.getAttribute("name");

        if (icon === "menu-outline") {
            btnMenuMobImg.setAttribute("name", "close-outline");
        } else {
            btnMenuMobImg.setAttribute("name", "menu-outline");
        }
    });
}
