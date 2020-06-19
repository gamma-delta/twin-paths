events.listen("server.datapack.recipes", function (ev) {
    // Gold fiber requires crushed gold
    ev.remove({ id: 'naturesaura:gold_fiber' });
    ev.shaped(
        item.of('naturesaura:gold_fiber', 4),
        [
            'LGL',
            'GRG',
            'LGL'
        ],
        {
            L: '#minecraft:leaves',
            G: 'create:crushed_gold_ore',
            R: 'minecraft:grass'
        }
    ).id('naturesaura:gold_fiber');

    // Engineer's hammer requires iron sheets
    ev.remove({ id: 'immersiveengineering:crafting/hammer' });
    ev.shaped(
        item.of('immersiveengineering:hammer', 1),
        [
            ' IS',
            ' RI',
            'R  '
        ],
        {
            'I': '#forge:plates/iron',
            'S': 'minecraft:string',
            'R': '#forge:rods/wooden'
        }
    ).id('immersiveengineering:crafting/hammer');

    // Diamond, gold, and steel tools need strong sticks
    // this old version of JS doesn't have for of loops ;(
    ['naturesaura:ancient_stick', 'immersiveengineering:stick_treated'].forEach(function (stick) {
        [
            ['sword', [' M ', ' M ', ' S ']],
            ['shovel', [' M ', ' S ', ' S ']],
            ['pickaxe', ['MMM', ' S ', ' S ']],
            ['axe', ['MM ', 'MS ', ' S ']],
            ['hoe', ['MM ', ' S ', ' S ']]
        ].forEach(function (stuff) {
            var tool = stuff[0];
            var pattern = stuff[1];
            // Diamond
            ev.remove({ type: 'minecraft:crafting_shaped', output: 'minecraft:diamond_' + tool })
            ev.shaped(item.of('minecraft:diamond_' + tool, 1), pattern, { M: '#forge:gems/diamond', S: stick });
            // Gold
            ev.remove({ type: 'minecraft:crafting_shaped', output: 'minecraft:golden_' + tool })
            ev.shaped(item.of('minecraft:golden_' + tool, 1), pattern, { M: '#forge:ingots/gold', S: stick });
            // Steel
            ev.remove({ type: 'minecraft:crafting_shaped', output: 'immersiveengineering:' + tool + '_steel' })
            ev.shaped(item.of('immersiveengineering:' + tool + '_steel', 1), pattern, { M: '#forge:ingots/steel', S: stick });
        });
    });
});