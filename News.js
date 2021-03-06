import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
      country : 'in',
      pageSize: 5,
      category: 'general'
    }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }
 

    constructor(){
      super();
      this.state = {
          articles: [],
          loading: false,
          page: 1
      }
    }

    async componentDidMount(){
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3463d95b003408c9d4070925780b16d&page=1&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData= await data.json()
        console.log(parseData);
        
        this.setState({articles: parseData.articles,
          totalResults: parseData.totalResults,
          loading: false
        })
    }

    handlePrevClick= async()=>{
      let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3463d95b003408c9d4070925780b16d&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
      let data = await fetch(url);
        let parseData= await data.json()
        this.setState({
          page: this.state.page - 1,
          articles: parseData.articles,
          loading : false
        })
    }

    handleNextClick = async()=>{
      //if(!this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3463d95b003408c9d4070925780b16d&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData= await data.json()
        console.log(parseData);
        this.setState({
          page: this.state.page + 1,
          articles: parseData.articles,
          loading: false
        })
      
      
        
    }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsPanda - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}

        </div>
        <div className="containe d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
