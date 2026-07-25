# Jogos de Palavras - Arquivo Pessoal

Site pessoal para jogar Termo, Dueto e Quarteto (PT-BR) offline, com histórico dos últimos 7 dias.

## Funcionalidades

- 🎯 **Termo** – 1 palavra, 6 tentativas
- 2️⃣ **Dueto** – 2 palavras simultâneas, 7 tentativas  
- 4️⃣ **Quarteto** – 4 palavras simultâneas, 9 tentativas
- 📅 **Replay** – Jogue qualquer dia dos últimos 7 dias
- 💾 **Progresso salvo** – Continue de onde parou (localStorage)
- 🔒 **Privado** – `robots.txt` bloqueia indexação por buscadores

## Configuração no GitHub Pages

1. Crie um repositório **privado** no GitHub
2. Ative o GitHub Pages: Settings → Pages → Source: main branch, folder `/`
3. Faça upload de todos os arquivos desta pasta
4. Acesse em: `https://seu-usuario.github.io/nome-do-repo/`

## Atualizar palavras

As palavras são extraídas diretamente do term.ooo. Para atualizar:

```bash
node extract_words.js
```

Isso regenera o arquivo `assets/words_data.js` com as palavras mais recentes.

## Estrutura

```
├── index.html           # Hub principal
├── robots.txt           # Bloqueia buscadores
├── assets/
│   ├── style.css        # Estilos globais
│   ├── game.js          # Lógica do jogo
│   └── words_data.js    # Palavras extraídas do term.ooo
├── termo/
│   └── index.html       # Jogo Termo (1 palavra)
├── dueto/
│   └── index.html       # Jogo Dueto (2 palavras)
└── quarteto/
    └── index.html       # Jogo Quarteto (4 palavras)
```

## Nota

As palavras são as originais do [term.ooo](https://term.ooo). Este site é apenas para uso pessoal.
