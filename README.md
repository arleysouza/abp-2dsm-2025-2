### ▶️ Subindo os Containers

Para inicializar todo o ambiente (bancos de dados e aplicação), utilize o comando abaixo:
```bash
docker compose -f docker-compose.dev.yml up --build -d
```

- A flag `--build` garante que a imagem do servidor seja recompilada, aplicando quaisquer alterações recentes no código-fonte.

- Certifique-se de executar o comando na raiz do projeto, ou seja, no diretório onde está localizado o arquivo `docker-compose.dev.yml`. Caso contrário, o Docker não encontrará as definições dos serviços.

💡 Dica: Para encerrar os containers, utilize `Ctrl + C` no terminal e, em seguida, `docker compose -f docker-compose.dev.yml down` para liberar os recursos e remover a rede criada automaticamente.

---

### 📂 Estrutura de Pastas

A organização do projeto segue uma separação clara entre bancos de dados (scripts e dados), servidor (código da aplicação) e configurações gerais.

```bash
app/
├── balcar-campanha/
│   ├── csv/                       # Arquivos de dados (CSV) carregados nas tabelas
│   ├── copy-table.sql             # Script SQL para importar os arquivos CSV para o banco
│   ├── create-table.sql           # Script SQL para criar a estrutura das tabelas
│   └── balcar-campanha-modelo.xml # Modelo conceitual do banco, visualizável no DBDesigner
│  
├── furnas-campanha/
│   ├── csv/                       # Arquivos de dados (CSV) carregados nas tabelas
│   ├── copy-table.sql             # Script SQL para importar os arquivos CSV para o banco
│   ├── create-table.sql           # Script SQL para criar a estrutura das tabelas
│   └── furnas-campanha-modelo.xml # Modelo conceitual do banco, visualizável no DBDesigner
│   
├── sima/
│   ├── csv/                       # Arquivos de dados (CSV) específicos do SIMA
│   ├── copy-table.sql             # Script SQL para importação dos CSV
│   ├── create-table.sql           # Script SQL para criação das tabelas
│   └── sima-modelo.xml            # Modelo conceitual do banco SIMA (para DBDesigner)
│ 
├── server/
│   ├── src/                       # Código-fonte da aplicação
│   │   ├── configs/               # Configurações, como conexão com banco de dados
│   │   │   └── db.ts
│   │   ├── controllers/           # Lógica de controle (recebem requisições, chamam serviços)
│   │   ├── routes/                # Definição das rotas da API
│   │   └── index.ts               # Arquivo principal que inicializa o servidor
│   ├── .env                       # Variáveis de ambiente da aplicação
│   ├── Dockerfile                 # Receita para construção da imagem Docker do servidor
│   ├── package.json               # Dependências e scripts NPM
│   ├── package-lock.json          # Controle de versões exatas das dependências
│   ├── tsconfig.json              # Configurações do compilador TypeScript
│   ├── tsconfig.eslint.json       # Regras de análise estática específicas para ESLint
│   ├── eslint.config.mjs          # Configuração de qualidade de código (ESLint)
│   ├── .prettierrc                # Configuração de formatação automática (Prettier)
│   └── .prettierignore            # Arquivos/pastas ignorados pelo Prettier
│
├── .gitignore                     # Define arquivos e pastas que não devem ir para o Git
└── docker-compose.dev.yml         # Definições dos serviços Docker para ambiente de desenvolvimento
  
```

### 🔑 Explicação Geral

As pastas `furnas-campanha/` e `sima/` contêm tudo o que é necessário para criar e popular cada banco de dados:

- Estrutura (tabelas)

    - Dados (arquivos CSV)
    - Modelo conceitual (XML, para documentação e análise em ferramentas gráficas).
    - A pasta `server/` concentra o código da aplicação Node.js/TypeScript que consome os bancos.
    - O servidor é containerizado via Dockerfile e configurado pelo `docker-compose.dev.yml`.

É aqui que entram os conceitos de APIs, camadas de software (rotas, controllers, configs), e boas práticas de desenvolvimento (ESLint, Prettier, variáveis de ambiente).

Os arquivos da raiz (`.gitignore`, `docker-compose.dev.yml` etc.) servem para configuração global do projeto.

---

### Banco de dados em containers separados

 Em cenários de desenvolvimento e até em alguns de produção, manter cada banco de dados em seu próprio container é uma boa prática porque:
- Isolamento: cada banco tem seu próprio ciclo de vida, backup e restore.
- Reprodutibilidade: você consegue subir/derrubar apenas o banco necessário sem afetar os outros.
- Escalabilidade: se um banco crescer demais ou precisar de configuração específica (parâmetros do Postgres, volume dedicado etc.), não impacta os demais.
- Menos acoplamento: facilita dividir responsabilidades entre times ou serviços diferentes.

⚠️ Contudo, em produção, muitas vezes se opta por um único cluster PostgreSQL com vários bancos ou esquemas, para simplificar administração e reduzir sobrecarga de containers.


### Integração Contínua no GitHub Actions

Job node-ci → validação de código (formatação, lint, build).
Job docker-ci → build e subida da stack Docker.