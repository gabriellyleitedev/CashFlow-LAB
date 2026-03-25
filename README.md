# CashFlowLab – Sistema de Fluxo de Caixa

[![Engine-React](https://img.shields.io/badge/Engine-React_18-61DAFB)](#)  
[![Animation-Framer](https://img.shields.io/badge/Animation-Framer_Motion-ff0055)](#)  

---

## 💡 Sobre o projeto

O CashFlowLab é um sistema de gerenciamento financeiro focado na organização de lançamentos, cálculo de saldo e visualização de dados.

Este projeto representa a implementação da lógica de um sistema financeiro real em desenvolvimento, com foco em fluxo de dados, regras de negócio e interação do usuário.

---

## 📸 Preview do Sistema

### 🟢 Versão do Produto (em desenvolvimento)
![Treeyo]<img width="1600" height="752" alt="image" src="https://github.com/user-attachments/assets/30933fe5-d227-481f-88d9-7d41f2e2febe" />


### 🟣 Versão Técnica (este repositório)
![CashFlowLab]<img width="1600" height="754" alt="image" src="https://github.com/user-attachments/assets/596dc5e9-9af7-444e-8023-8e82b3ed9b4c" />


> ⚠️ Este repositório representa uma versão simplificada focada na lógica de lançamentos.  
> A interface verde pertence à versão completa do produto em desenvolvimento.

---

## 🚀 Funcionalidades

- Cadastro de lançamentos financeiros (Entrada, Saída, Investimento)
- Filtro dinâmico por múltiplos campos
- Cálculo automático de totais (entradas, saídas e investimentos)
- Atualização em tempo real da interface
- Persistência local com `localStorage`
- Remoção de lançamentos com feedback visual

---

## 🧠 Arquitetura e Lógica

### `CashFlowMain`
Responsável por gerenciar estados, fluxo de dados e regras de negócio.

- Controle de lista de lançamentos
- Filtragem dinâmica (`useMemo`)
- Cálculo de totais com `reduce`
- Persistência automática com `useEffect`

---

### `CardLancamento`
Componente responsável pela apresentação individual dos dados.

- Formatação monetária (`Intl.NumberFormat`)
- Normalização de datas
- Identificação visual por tipo de lançamento
- Animações com `framer-motion`

---

## ⚙️ Decisões Técnicas

- Separação clara entre lógica e apresentação
- Uso de `useMemo` para otimização de performance
- Estrutura preparada para evolução com backend
- Arquitetura modular para facilitar escalabilidade

---

## 🔄 Fluxo do Sistema

1. Usuário adiciona um lançamento  
2. Estado é atualizado  
3. Totais são recalculados  
4. Lista é filtrada dinamicamente  
5. Interface é atualizada em tempo real  

---

## 🎯 Objetivo

Demonstrar a construção de um sistema financeiro com foco em:

- Organização de estado
- Lógica de negócios
- Manipulação de dados
- Experiência de uso

---

## 📌 Observação

Este projeto foi desenvolvido como representação da lógica de um sistema maior em desenvolvimento, preservando a estrutura técnica sem expor o código completo do produto.
