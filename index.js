function imprimeStops(args, stops = 3) {
    const { _, l, tx, op, cl } = args;
    const [cmd, t, sl, sg1, sg2, sg3] = _;
    let q = stops;
    let cost = 0;
    let profit = 0;
    do {
        const qq = q / stops;
        const nOps = 2 + stops;
        const taxes = op * nOps + (op * (1 + tx / 100)) * nOps;
        const buy = t * q;
        let sell = sg1 * qq
        if (stops > 1) {
            sell += sg2 * qq;
        }
        if (stops > 2) {
            sell += sg3 * qq;
        }
        cost = buy + taxes;
        profit = sell - cost;
        const minProfit = buy * l / 100;
        done = profit >= minProfit && cost < cl;
        q += stops;
    } while (!done && q < 10000);
    if (!done) {
        if (l > 1) {
            const newL = Math.floor(l * .9);
            imprimeStops({...args, l: newL}, stops);
        } else {
            console.log('lucro de', l, '% não realisável');
        }
    } else {
        const qtd = (q - stops) / stops;
        console.log('lucro de', l, '% com a seguinte configuração');
        console.log('trigger', t);
        console.log('stop loss', sl);
        console.log('stop gain em', sg1, 'com', qtd, 'ações');
        if (stops > 1) {
            console.log('stop gain em', sg2, 'com', qtd, 'ações');
        }
        if (stops > 2) {
            console.log('stop gain em', sg3, 'com', qtd, 'ações');
        }
        console.log('=> custo da operação', Math.floor(cost));
        console.log('=> lucro da operação', Math.floor(profit));
    }
}

const argv = require('yargs')
    .usage('Uso: $0 <comando> [opcoes]')
    .command('stops', 'Retorna os stops com a quantidade de ações')
    .example('$0 stops 12.3 10 14.4 16 18.8', 'Retorna os stops com a quantidade ideal para uma ação com trigger 12.3, stoploss 10, stopgain 14.4, stopgain 16 e stopgain 18.8')
    .alias('op', 'valorOperacao')
    .nargs('op', 1)
    .default('op', 6.98)
    .describe('op', 'Valor da operação (corretagem)')
    .alias('tx', 'taxaImposto')
    .nargs('tx', 1)
    .default('tx', 5)
    .describe('tx', 'Porcentagem de impostos')
    .alias('l', 'lucro')
    .nargs('l', 1)
    .default('l', 10)
    .describe('l', 'Porcentagem de lucro mínimo')
    .alias('cl', 'custo')
    .nargs('cl', 1)
    .default('cl', 2000)
    .describe('cl', 'Custo limite para comprar ações')
    .alias('h', 'help')
    .help('h')
    .argv;

console.log('== SIMULAÇÃO 1 ==');
imprimeStops(argv, 1);
console.log('');
console.log('== SIMULAÇÃO 2 ==');
imprimeStops(argv, 2);
console.log('');
console.log('== SIMULAÇÃO 3 ==');
imprimeStops(argv, 3);