const mongoose = require('mongoose')

const Board = mongoose.model('Board')

const Query = {
  Query: {
    boardAllQuery: async (_, {}) => {
      const boards = await Board.find()
      return boards
    }
  }
}

const Mutation = {
  Mutation: {
    boardCreate: async (_, { title, content, startDate, endDate }) => {
      const board = new Board({ title, content, startDate, endDate })
      await board.save()
      return board
    },

    boardUpdate: async (_, { _id, title, content, startDate, endDate }) => {
      await Board.findOneAndUpdate(
        { _id },
        { title, content, startDate, endDate }
      )
      return _id
    },

    boardDelete: async (_, { _id }) => {
      await Board.findOneAndRemove({ _id })
      return { _id }
    }
  }
}

module.exports = { Query, Mutation }
