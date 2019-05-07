# swingtrader
Calculadora volume de ações para Swing Trade

## Usage

```
Uso: index.js <comando> [opcoes]

Comandos:
  index.js stops  Retorna os stops com a quantidade de ações

Opções:
  --version              Exibe a versão                               [booleano]
  --op, --valorOperacao  Valor da operação (corretagem)           [padrão: 6.98]
  --tx, --taxaImposto    Porcentagem de impostos                     [padrão: 5]
  -l, --lucro            Porcentagem de lucro máximo                [padrão: 10]
  --cl, --custo          Custo limite para comprar ações          [padrão: 2000]
  -h, --help             Exibe ajuda                                  [booleano]

Exemplos:
  index.js stops 12.3 10 14.4 16 18.8  Retorna os stops com a quantidade ideal
                                       para uma ação com trigger 12.3, stoploss
                                       10, stopgain 14.4, stopgain 16 e stopgain
                                       18.8
```
