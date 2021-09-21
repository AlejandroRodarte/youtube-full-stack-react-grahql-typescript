const regex = {
  noAtSigns: /^[^@]+$/,
  uuid: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  positiveOrNegativeIntegers: /^-?\d+$/,
  positiveIntegers: /^(0|[1-9][0-9]*)$/,
  cursors: {
    posts: {
      popular: /^createdAt=(0|[1-9][0-9]*),points=(-?\d*)$/,
      trending: /^createdAt=(0|[1-9][0-9]*),points=(-?\d*),trendingScore=(-?\d*)$/
    }
  }
}

export default regex
