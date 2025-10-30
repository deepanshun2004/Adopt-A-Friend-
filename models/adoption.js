const { getDb } = require('../db');

class Adoption {
  constructor(formData) {
    this.firstName = formData.firstName;
    this.lastName = formData.lastName;
    this.email = formData.email;
    this.phone = formData.phone;
    this.altPhone = formData.altPhone || null;
    this.address = formData.address;
    this.city = formData.city;
    this.state = formData.state;
    this.zip = formData.zip;
    this.profession = formData.profession;
    this.petName = formData.petName;
    this.petType = formData.petType;
    this.experience = formData.experience;
    this.homeType = formData.homeType;
    this.message = formData.message || null;
    this.createdAt = new Date();
    this.status = 'pending';
  }

  async save() {
    const db = getDb();
    const result = await db.collection('adoptions').insertOne(this);
    return result;
  }

  static async getAll() {
    const db = getDb();
    return await db.collection('adoptions').find().sort({ createdAt: -1 }).toArray();
  }
}

module.exports = Adoption;