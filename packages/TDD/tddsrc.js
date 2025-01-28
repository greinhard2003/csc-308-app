class Portfolio {
  constructor() {
    this.portlist = [];
  }
  isEmpty() {
    return this.portlist.length === 0;
  }
  getindex(ticker) {
    for (let i = 0; i < this.portlist.length; i++) {
      if (this.portlist[i].ticker === ticker) {
        return i;
      }
    }
    return -1;
  }
  purchase(ticker, shares) {
    const idx = this.getindex(ticker);
    if (idx >= 0) {
      this.portlist[idx].shares += shares;
    } else {
      this.portlist.push({ ticker: ticker, shares: shares });
    }
  }
  sell(ticker, shares) {
    const idx = this.getindex(ticker);
    if (this.numshares(ticker) === shares) {
      this.portlist.splice(idx, 1);
    } else if (this.numshares(ticker) < shares) {
      throw new Error("Not possible to sell this number of shares.");
    } else {
      this.portlist[idx].shares -= shares;
    }
  }
  stocks() {
    return this.portlist.length;
  }
  numshares(ticker) {
    const idx = this.getindex(ticker);
    if (idx >= 0) {
      return this.portlist[idx].shares;
    } else {
      return 0;
    }
  }
}

exports.Portfolio = Portfolio;
