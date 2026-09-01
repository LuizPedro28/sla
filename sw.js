# Low Volume Tracker

Tracker de musculação feito com HTML, CSS e JavaScript puro — agora também é
um **PWA (Progressive Web App)**: instalável no celular/computador e funciona
offline depois da primeira visita.

## O que mudou nesta versão

- **Novo visual**, com identidade própria (tipografia condensada nos títulos,
  abas de dia em formato de "etiqueta", grade de séries em estilo caderno de
  treino e uma paleta inspirada em ferro/latão de academia). Inclui modo
  claro/escuro e 5 cores de destaque (Latão, Ferro, Ferrugem, Oliva, Grafite).
- **Edição de dias**: "Editar dias" permite renomear a aba e o título de cada
  dia, reordenar (↑/↓), adicionar, remover e marcar qualquer dia como "dia de
  descanso" — sem mexer em código.
- **Vira um app de verdade**: manifest + service worker + ícones, então dá
  para instalar na tela inicial e abrir em tela cheia, sem barra do navegador,
  inclusive sem internet depois de aberto uma vez.
- Indicador de "último registro" de cada dia, no topo da sessão.
- Rascunho de carga/reps/RIR salvo a cada tecla digitada (mais seguro contra
  perda de dados).
- Dados antigos já salvos no navegador são migrados automaticamente para o
  novo formato — nada é perdido ao atualizar o arquivo.

## Recursos

- Treinos organizados por dia, com dias totalmente editáveis
- Registro de carga, repetições e RIR
- Histórico de sessões
- Biblioteca com dezenas de exercícios, execução e variações
- Temas de cores e modo claro/escuro
- Instalável (PWA) e funciona offline
- Dados salvos no `localStorage` — sem conta, sem backend
- Responsivo para computador e celular

## Estrutura

```text
low-volume-tracker/
├── index.html         → o app
├── manifest.json       → metadados do PWA (nome, ícone, cor, modo standalone)
├── sw.js                → service worker (cache offline)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-192.png
│   ├── icon-maskable-512.png
│   ├── apple-touch-icon.png
│   └── favicon-32.png
└── README.md
```

Todos os arquivos ficam na raiz do repositório — isso importa porque o
`manifest.json` e o `sw.js` usam caminhos relativos (`./`), o que é o que
funciona corretamente no GitHub Pages, inclusive quando o site é publicado em
um subcaminho como `https://usuario.github.io/repositorio/`.

## Como rodar localmente

Service workers só funcionam em `https://` ou em `http://localhost`, então
para testar o comportamento de PWA (não só o app em si) use um servidor
local em vez de abrir o arquivo direto com duplo clique:

```bash
python -m http.server 8000
```

Depois abra:

```text
http://localhost:8000
```

## Como colocar no GitHub

No terminal, dentro da pasta que contém `index.html`, `manifest.json`,
`sw.js` e `icons/`:

```bash
git init
git add .
git commit -m "feat: cria low volume tracker (PWA)"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## GitHub Pages

No repositório do GitHub:

**Settings → Pages → Build and deployment → Source → Deploy from a branch → main → / (root) → Save**

Espere alguns instantes e acesse a URL que o GitHub Pages mostrar
(algo como `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`).

## Instalando como app

- **Android / Chrome / Edge**: abra o site publicado e vá em Configurações
  dentro do app → "Instalar app" (o botão só aparece quando o navegador
  permite instalação). Também é possível instalar pelo menu do navegador
  (⋮ → "Instalar app" / "Adicionar à tela inicial").
- **iPhone / iPad (Safari)**: abra o site, toque em Compartilhar → "Adicionar
  à Tela de Início". O iOS não expõe um evento de "instalar", por isso não há
  botão automático nesse caso.
- **Desktop (Chrome/Edge)**: ícone de instalação na barra de endereço, ou o
  mesmo botão "Instalar app" dentro de Configurações.

Depois de instalado, o app abre em tela cheia (sem a barra do navegador) e
continua funcionando mesmo sem internet, porque o `sw.js` guarda uma cópia do
app no dispositivo na primeira visita.

## Atualizando o site depois de publicado

Como o service worker guarda uma cópia offline, navegadores que já instalaram
o app podem continuar vendo a versão antiga por um tempo. Sempre que você
alterar `index.html`, `manifest.json` ou os ícones e publicar de novo, edite
o topo do `sw.js` e mude:

```js
const CACHE_NAME = "lvt-cache-v1";
```

para `"lvt-cache-v2"` (e assim por diante). Isso faz o service worker
descartar o cache antigo e buscar os arquivos novos na próxima abertura.

## Observação sobre os dados

O projeto usa `localStorage`. Os treinos ficam salvos no
navegador/aparelho em que foram registrados. Se você abrir o site em outro
computador, navegador ou perfil, os dados não aparecem automaticamente — não
há sincronização entre dispositivos.

## Observação sobre a fonte

Os títulos usam a fonte Oswald via Google Fonts (carregada pela internet na
primeira vez). Sem conexão, o app funciona normalmente com a fonte de
sistema como alternativa.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Web Storage API (`localStorage`)
- Web App Manifest + Service Worker (PWA)
