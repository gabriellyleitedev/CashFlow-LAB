# CashFlowLab – Estudo de Lógica de Sistema Financeiro Pessoal

[![Engine-React](https://img.shields.io/badge/Engine-React_18-61DAFB)](#)  
[![Animation-Framer](https://img.shields.io/badge/Animation-Framer_Motion-ff0055)](#)  
[![Logic-Study](https://img.shields.io/badge/Logic-Study-orange)](#)

Esse repositório é um **resumo de estudo de lógica** de um sistema financeiro pessoal que estou desenvolvendo.  
O objetivo é demonstrar **a arquitetura, fluxo de dados e lógica de negócios** de lançamentos financeiros, filtragem, cálculos de saldo e interações de forma clara.

> ⚠️ Nota: O foco é **aprender e mostrar a lógica do código**, não o design ou a interface.

---

## Estrutura do Código

O estudo está dividido em dois componentes principais:

### 1. `CashFlowMain`
Componente principal que organiza o fluxo de dados e lógica do sistema.

**Estados principais:**
- `lista`: armazena todos os lançamentos financeiros, recuperados e persistidos no `localStorage`.
- `tipoAtivo`: controla o tipo de lançamento selecionado (`Entrada`, `Saída`, `Investimento`) para o formulário.
- `busca`: termo de pesquisa que filtra os lançamentos dinamicamente.

**Hooks importantes:**
- `useEffect` → salva automaticamente `lista` no `localStorage` a cada atualização.
- `useMemo`:
  - `listaFiltrada` → filtra e ordena os lançamentos com base em múltiplos campos (`categoria`, `conta`, `metodo`, `valor`).
  - `totais` → calcula totais de entradas, saídas e investimentos usando `reduce`.

**Principais funções:**
- `handleDeletar(id)` → remove um lançamento da lista e dispara uma notificação visual.

**Renderização:**
- **Card de destaque:** mostra o último lançamento adicionado (`CardLancamento`).
- **Tabela de histórico:** lista todos os lançamentos filtrados, com cores e ícones diferentes dependendo do tipo.
- **Formulário de lançamento:** permite adicionar novos lançamentos, atualizando imediatamente a lista e os cálculos.

---

### 2. `CardLancamento`
Componente que exibe um lançamento individual de forma resumida.

**Props:**
- `lancamento` → objeto com informações do lançamento.

**Lógica interna:**
- Formatação de valores monetários (`Intl.NumberFormat`)  
- Extração de um **ID curto** para identificação rápida  
- Formatação de datas, suportando formatos `YYYY-MM-DD` e `DD/MM/YYYY`  
- Diferenciação visual baseada em tipo de lançamento (`Entrada`, `Saída`, `Investimento`)  
- Efeitos de animação (`framer-motion`) para entrada e hover  

**O card enfatiza**:
- Categoria do lançamento  
- Valor formatado  
- Tipo do lançamento  
- Data e ID curto  

---

## Decisões de Arquitetura e Lógica

1. **Separação de responsabilidades:**  
   - `CashFlowMain` → lógica e estados  
   - `CardLancamento` → apresentação individual de dados

2. **Otimizações de desempenho:**
   - `useMemo` usado para não recalcular filtros e totais a cada render  
   - `AnimatePresence` e `motion` usados para transições suaves sem impactar desempenho

3. **Persistência simples:**
   - `localStorage` escolhido por ser rápido e permitir testes sem backend

4. **Flexibilidade e escalabilidade:**
   - Adicionar novos tipos de lançamentos é trivial  
   - Lógica de filtragem e cálculo de totais funciona independentemente do número de campos

5. **Interações de usuário:**
   - Animações de hover e adição/removimento de lançamentos  
   - Botão de exclusão com feedback visual

---

## Como Entender o Código

1. Comece pelo `CashFlowMain.jsx`:
   - Veja como os estados são definidos  
   - Entenda a filtragem (`listaFiltrada`)  
   - Observe como os totais são calculados  

2. Analise `CardLancamento.jsx`:
   - Veja como cada lançamento é exibido  
   - Observe formatações e animações  

3. Siga o fluxo:
   - Adiciona lançamento → atualizado na lista → recalcula totais → renderiza card e tabela  

---

## Conclusão

Este repositório **não é um produto final**, mas um **resumo de estudo de lógica** que mostra como um sistema financeiro pode ser estruturado com React.  
O objetivo é **demonstrar raciocínio, organização de estado, cálculo e interação**, e não focar em design ou UI.
