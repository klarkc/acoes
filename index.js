function imprimeStops(args) {
    const { _, l, tx, op } = args;
    const [cmd, t, sl, sg1, sg2, sg3] = _;
    let q = 3;
    let cost = 0;
    let profit = 0;
    do {
        const qq = q / 3;
        const taxes = op + op * (1 + tx / 100) * 2;
        const buy = t * q;
        const sell = sg1 * qq + sg2 * qq + sg3 * qq;
        cost = buy + taxes
        profit = sell - cost;
        const minProfit = buy * l / 100;
        done = profit >= minProfit;
        q += 3;
    } while (!done && q < 10000);
    if (!done) {
        console.log('lucro de', l, '% não realisável');
        if (l > 1) {
            const newL = Math.floor(l * .9);
            console.log('tentando com lucro de', newL, '%');
            imprimeStops({...args, l: newL});
        }
    } else {
        console.log('lucro de', l, '% com a seguinte configuração');
        console.log('=> trigger', t);
        console.log('=> stop loss', sl);
        console.log('=> stop gain em', sg1, 'com', q/3, 'ações');
        console.log('=> stop gain em', sg2, 'com', q/3, 'ações');
        console.log('=> stop gain em', sg3, 'com', q/3, 'ações');
        console.log('custo da operação', Math.floor(cost));
        console.log('lucro da operação', Math.floor(profit));
    }
}

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

imprimeStops(argv)