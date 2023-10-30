import '@/style.css'
import './styles.css'

const linkHome = document.getElementById("linkHome") as HTMLLinkElement
const linkResetPass = document.getElementById("linkResetPass") as HTMLLinkElement
const linkSignUp = document.getElementById("linkSignUp") as HTMLLinkElement

linkHome.href = "../../../index.html"
linkResetPass.href = "#"
linkSignUp.href =  "../cadastro/index.html"
