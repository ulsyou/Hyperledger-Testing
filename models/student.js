const CouchDB = require('nano');
const couchdbConfig = require('../config/couchdb-config.json');

// Kết nối với CouchDB
const couchdb = CouchDB({
    url: couchdbConfig.url,
    requestDefaults: {
        auth: {
            username: couchdbConfig.auth.username,
            password: couchdbConfig.auth.password
        }
    }
});

// Định nghĩa model cho sinh viên
const StudentModel = {
    getAllStudents: async () => {
        const couchdbDb = couchdb.db.use('students');
        const couchdbResponse = await couchdbDb.list({ include_docs: true });
        return couchdbResponse.rows.map((row) => row.doc);
    },
    addStudent: async (id, name, age) => {
        const couchdbDb = couchdb.db.use('students');
        const couchdbResponse = await couchdbDb.insert({ _id: id, name, age });
        return couchdbResponse;
    },
    deleteStudent: async (id) => {
        const couchdbDb = couchdb.db.use('students');
        const couchdbResponse = await couchdbDb.get(id);
        await couchdbDb.destroy(id, couchdbResponse._rev);
        return couchdbResponse;
    },
    updateStudent: async (id, name, age) => {
        const couchdbDb = couchdb.db.use('students');
        const couchdbResponse = await couchdbDb.get(id);
        const updatedStudent = { _id: id, _rev: couchdbResponse._rev, name, age };
        await couchdbDb.insert(updatedStudent);
        return couchdbResponse;
    },
};

module.exports = StudentModel;
