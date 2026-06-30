---
name: JK Distribuidora
description: Sistema visual B2B premium — confiança, clareza e identidade unificada entre JK, Tutty e Igarapé
colors:
  jk-green-deep: "#32703d"
  jk-green-light: "#6ad47d"
  jk-orange: "#f27f04"
  jk-orange-light: "#ff9a3c"
  ink: "#1a1a1a"
  ink-muted: "#555555"
  surface: "#ffffff"
  surface-subtle: "#f8fafc"
  border: "#e0e0e0"
  cafe-brown: "#8b4513"
  tutty-orange: "#ff6b35"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "20px"
  pill: "50px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.jk-orange}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.jk-orange-light}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.jk-green-deep}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  nav-cta:
    backgroundColor: "{colors.jk-orange}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
---

# Design System: JK Distribuidora

## 1. Overview

**Creative North Star: "O Parceiro Confiável"**

O sistema visual da JK Distribuidora comunica solidez B2B antes de espetáculo. A hierarquia é clara, o conteúdo comercial é fácil de encontrar e as marcas representadas (Tutty Sucos, Café Igarapé) compartilham uma família visual sem perder personalidade. A profundidade vem de camadas tonais e espaçamento generoso — não de glassmorphism, sombras pesadas ou animações decorativas.

O site rejeita explicitamente o visual genérico de SaaS, varejo promocional barato e scaffolding de landing page gerada por IA. A unificação substitui Inter como padrão por um par serif + sans com contraste real.

**Key Characteristics:**

- Verde institucional (#32703d) como âncora de confiança; laranja (#f27f04) reservado para CTAs e destaques comerciais
- Superfícies predominantemente planas com fundos brancos ou neutros frios (#f8fafc)
- Tipografia com contraste de famílias: serif para display, sans humanista para corpo
- Navegação uppercase com peso 600; contato sempre visível
- Marcas filhas (Tutty, Igarapé) mantêm acentos próprios dentro da estrutura JK

## 2. Colors

Paleta ancorada no verde distribuidor e laranja comercial, com neutros frios para legibilidade B2B.

### Primary

- **Verde Distribuidor** (#32703d): cor institucional JK — títulos de seção, links ativos, ícones de credibilidade, fundos de destaque em blocos institucionais
- **Verde Vivo** (#6ad47d): acento secundário para gradientes sutis e estados hover em elementos verdes

### Secondary

- **Laranja Comercial** (#f27f04): CTAs primários, botão de contato na nav, destaques de ação
- **Laranja Claro** (#ff9a3c): estados hover e gradientes de CTA

### Tertiary

- **Marrom Igarapé** (#8b4513): reservado às superfícies e acentos da marca Café Igarapé
- **Laranja Tutty** (#ff6b35): reservado às superfícies e acentos da marca Tutty Sucos — não usar no site institucional JK

### Neutral

- **Tinta** (#1a1a1a): texto principal, ícones, barras de navegação
- **Tinta Suave** (#555555): texto secundário e descrições — nunca abaixo de 4.5:1 no fundo branco
- **Superfície** (#ffffff): fundo principal
- **Superfície Sutil** (#f8fafc): seções alternadas, cards em repouso
- **Borda** (#e0e0e0): divisores e campos de formulário

### Named Rules

**The Accent Rarity Rule.** O laranja comercial aparece em ≤15% de qualquer tela — CTAs, um destaque por seção, nunca como fundo dominante no site JK.

**The Brand Lane Rule.** Tutty e Igarapé usam seus acentos próprios apenas nas respectivas páginas. O site institucional JK nunca mistura #ff6b35 (Tutty) com a paleta principal.

## 3. Typography

**Display Font:** Fraunces (com Georgia, serif) — substitui Inter nos títulos
**Body Font:** Source Sans 3 (com system-ui, sans-serif) — substitui Inter no corpo
**Label Font:** Source Sans 3 — navegação e rótulos

**Character:** Serif confiável com personalidade editorial para headlines; sans humanista limpa para leitura B2B prolongada. Contraste de famílias, não de peso sozinho.

### Hierarchy

- **Display** (600, clamp(2.5rem, 5vw, 4rem), 1.1): hero institucional, nome da empresa
- **Headline** (600, clamp(1.75rem, 3vw, 2.5rem), 1.2): títulos de seção (Sobre, Segmentos, Diferenciais)
- **Title** (600, 1.25rem, 1.3): subtítulos de cards e blocos
- **Body** (400, 1rem, 1.6): parágrafos descritivos — máximo 65–75ch por linha
- **Label** (600, 0.875rem, 0.05em tracking, uppercase): links de navegação, rótulos de formulário

### Named Rules

**The No-Inter Rule.** Inter está proibida no ecossistema unificado. Migrar todas as páginas para Fraunces + Source Sans 3.

**The Display Ceiling Rule.** Títulos hero não ultrapassam 4rem no clamp máximo. Acima disso a página grita em vez de convencer.

## 4. Elevation

Sistema predominantemente plano. Profundidade é comunicada por contraste tonal entre superfícies (#ffffff vs #f8fafc), bordas sutis (#e0e0e0) e espaçamento vertical generoso — não por sombras decorativas ou blur de vidro.

### Shadow Vocabulary

- **Hover CTA** (`0 4px 16px rgba(242, 127, 4, 0.25)`): única sombra permitida em repouso/hover de botões primários
- **Nav flutuante** (`0 4px 24px rgba(0, 0, 0, 0.08)`): sombra mínima na barra de navegação fixa, se necessária

### Named Rules

**The Flat-By-Default Rule.** Superfícies são planas em repouso. Sombras aparecem apenas como resposta a hover em CTAs. Glassmorphism (`backdrop-filter: blur`) está proibido na unificação.

## 5. Components

### Buttons

- **Shape:** Cantos totalmente arredondados (50px / pill)
- **Primary:** fundo laranja sólido (#f27f04), texto branco, padding 16px 32px, peso 600
- **Hover / Focus:** tom #ff9a3c, leve translateY(-2px), sombra hover CTA; focus-visible com outline 2px #32703d
- **Secondary:** transparente com borda 2px branca ou verde; hover preenche com branco e texto verde

### Cards / Containers

- **Corner Style:** 16–20px em cards institucionais; evitar cards aninhados
- **Background:** branco (#ffffff) ou sutil (#f8fafc)
- **Shadow Strategy:** nenhuma em repouso; borda 1px #e0e0e0 se separação for necessária
- **Internal Padding:** 32px desktop, 20px mobile

### Inputs / Fields

- **Style:** fundo branco, borda 1px #e0e0e0, radius 8px, padding 12px 16px
- **Focus:** borda #32703d, sem glow colorido
- **Error:** borda #f27f04 com mensagem em #1a1a1a (não vermelho genérico)

### Navigation

- **Style:** barra fixa, fundo branco sólido (sem blur), logo JK à esquerda
- **Typography:** Source Sans 3, 600, uppercase, 0.05em tracking
- **Default:** texto #1a1a1a; hover/active: #32703d com underline gradiente verde
- **CTA Contato:** pill laranja, sempre visível no desktop
- **Mobile:** menu full-screen com fundo branco sólido, sem backdrop-filter

### Segment Card (JK)

- **Style:** bloco plano com ícone verde, título serif, descrição sans
- **Hover:** leve mudança de fundo para #f8fafc, sem elevação

## 6. Do's and Don'ts

### Do:

- **Do** usar verde #32703d como cor institucional dominante no site JK
- **Do** reservar laranja #f27f04 para CTAs e ações comerciais
- **Do** manter contraste WCAG AA em todos os textos (≥4.5:1 corpo, ≥3:1 display)
- **Do** respeitar `prefers-reduced-motion` desativando animações de entrada e transições longas
- **Do** unificar tipografia com Fraunces + Source Sans 3 em todas as páginas

### Don't:

- **Don't** usar visual genérico de SaaS/startup: Inter, gradientes roxos/cyan, cards idênticos em grid
- **Don't** parecer varejo barato ou promocional demais — sem banners gritantes ou excesso de badges
- **Don't** usar glassmorphism, animações chamativas sem propósito ou gradientes decorativos em todo lugar
- **Don't** colocar eyebrow em caixa alta em cada seção ou numeração 01/02/03 sem sequência real
- **Don't** misturar paletas Tutty (#ff6b35) e JK (#32703d) na mesma página institucional
- **Don't** usar `border-left` colorido >1px como acento em cards ou alertas
