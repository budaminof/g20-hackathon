exports.up = function(knex, Promise) {
    return knex.schema.createTable('gear', function (table) {
    table.increments();
    table.integer('owner_id').unsigned().references('id').inTable('users');
    table.text('description');
    table.string('img_url');


  })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('gear');

};
