// console.log('alavancagem para obter', lucro, '% de lucro');
// calculaAcoes(valorOperacao, taxaImposto, lucro, stopLoss, stopGain1, stopGain2, stopGain3)

const argv = require('yargs')
    .usage('Uso: $0 <comando> [opcoes]')
    .command('stops', 'Retorna os stops com a quantidade de ações')
    .example('$0 stops 12.3 10 14.4 16 18.8', 'Retorna os stops com a quantidade ideal para uma ação com trigger 12.3, stoploss 10, stopgain 14.4, stopgain 16 e stopgain 18.8')
    .alias('op', 'valorOperacao')
    .nargs('op', 1)
    .default('op', 6.98)
    .describe('Valor da operação (corretagem)')
    .alias('tx', 'taxaImposto')
    .nargs('tx', 1)
    .default('tx', 5)
    .describe('Porcentagem de impostos')
    .alias('l', 'lucro')
    .nargs('l', 1)
    .default('l', 30)
    .describe('Porcentagem de lucro mínimo')
    .alias('h', 'help')
    .help('h')
    .argv;

