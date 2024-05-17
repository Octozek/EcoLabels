// import models
const Animal = require('./Animal');
const Category = require('./Category');
const Tag = require('./Tag');
const AnimalTag = require('./AnimalTag');
const User = require('./User');

// Products belongsTo Category
Animal.belongsTo(Category,{
  foreignKey:'category_id',
  onDelete:'CASCADE'
});
// Categories have many Animal
Category.hasMany(Animal,{
  foreignKey:'category_id'
});
// Animal belongToMany Tags (through animalTag)
Animal.belongsToMany(Tag,{
  through:AnimalTag,
  foreignKey:'animal_id'
});
// Tags belongToMany Animal (through animalTag)
Tag.belongsToMany(Animal,{
  through:AnimalTag,
  foreignKey:'tag_id'
});

module.exports = {
  Animal,
  Category,
  Tag,
  AnimalTag,
  User
};