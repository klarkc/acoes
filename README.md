# swingtrader
Calculadora volume de ações para Swing Trade

## Usage

```
Uso: index.js <comando> [opcoes]

Comandos:
  index.js stops  Retorna os stops com a quantidade de ações

Opções:
  --version            Exibe a versão                                 [booleano]
  -o, --valorOperacao  Valor da operação (corretagem)                [padrão: 0]
  -i, --taxaImposto    Porcentagem de impostos na Taxa de operação   [padrão: 0]
  -l, --lucro          Porcentagem de lucro máximo                  [padrão: 30]
  -c, --custo          Custo limite para comprar ações           [padrão: 10000]
  -a, --acoes          Número máximo de ações para efetuar compra [padrão: 1000]
  -h, --help           Exibe ajuda                                    [booleano]

Exemplos:
  index.js stops 12.3 10 14.4 16 18.8  Retorna os stops com a quantidade ideal
                                       para uma ação com trigger 12.3, stoploss
                                       10, stopgain 14.4, stopgain 16 e stopgain
                                       18.8
```

As opções default podem ser alteradas em `~/.config/configstore/swingtrader.json`