const filterId = (allData)=>{
    if(allData.length>0){
        for (const data of allData) {
      return  data.dataValues.map(item => item)
        }
    }
}

console.log(filterId([
     {
      dataValues: {
        id: 1,
        text: 'This is my very first post',
        name: 'My First Post',
        userId: 1
      },
      _previousDataValues: {
        id: 1,
        text: 'This is my very first post',
        name: 'My First Post',
        userId: 1
      },
      uniqno: 1,
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    },
     {
      dataValues: {
        id: 2,
        text: 'This is my very second post',
        name: 'My Second Post',
        userId: 1
      },
      _previousDataValues: {
        id: 2,
        text: 'This is my very second post',
        name: 'My Second Post',
        userId: 1
      },
      uniqno: 1,
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    },
     {
      dataValues: {
        id: 3,
        text: 'This is my very second post',
        name: 'My Third Post',
        createdAt: 2022-06-30T12:53:55.037Z,
        updatedAt: 2022-06-30T12:53:55.037Z,
        userId: 1
      },
      _previousDataValues: {
        id: 3,
        text: 'This is my very second post',
        name: 'My Third Post',
        createdAt: 2022-06-30T12:53:55.037Z,
        updatedAt: 2022-06-30T12:53:55.037Z,
        userId: 1
      },
      uniqno: 1,
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    },
     {
      dataValues: {
        id: 4,
        text: 'This is my very first user 2 post',
        name: 'My Part 2 Post',
        createdAt: 2022-06-30T15:11:53.656Z,
        updatedAt: 2022-06-30T17:08:44.745Z,
        userId: 2
      },
      _previousDataValues: {
        id: 4,
        text: 'This is my very first user 2 post',
        name: 'My Part 2 Post',
        createdAt: 2022-06-30T15:11:53.656Z,
        updatedAt: 2022-06-30T17:08:44.745Z,
        userId: 2
      },
      uniqno: 1,
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    }
  ]))