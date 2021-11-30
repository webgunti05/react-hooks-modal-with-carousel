import React, {useEffect, useState } from 'react'
import axios from 'axios'

const  MainPage = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(null)
    const [popData, setPopData] = useState([])
    const [indexVal, setIndexVal] = useState(0)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            baseURL: 'https://fakestoreapi.com',
            url: '/products',
          })
            .then(({ data }) => {
              setData(data)
            })
            .catch(err => console.dir(err))
            .finally(() => setLoading(false))
    }, [])

    //to open the product modal
    const OpenPop = (id, item, idx) => {
      setOpen(id)
      setPopData([item])
      setIndexVal(idx)
    }
    //to close the product modal
    const closePop = () => {
      setOpen(null)
    }

    //to visit the prev product through modal
    const onPrevClick = () =>{
     for(let i = data.length; i > 0;  i--){
      setIndexVal(indexVal - 1)
     }
     let getData = data?.filter((item, index) => index === indexVal - 1);
      setPopData(getData)
    }
    //to visit the next product through modal
    const onNextClick = () => {
      for(let i = 0; i < data.length; i++){
        setIndexVal(indexVal + 1)
      }
      let getData = data?.filter((item, index) => index === indexVal + 1);
      setPopData(getData)
    }


    //Styles
    let PrevButton = {
      position: 'absolute',
      top: '50%',
      left: '10px',
      zIndex: '200'
    }
    let NextButton = {
      position: 'absolute',
      top: '50%',
      right: '10px',
      zIndex: '200'
    }

    let PopupDiv = {
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform:'translate(-50%, -50%)',
      background : '#fff', width: '600px', boxShadow: '0px 0px 100px #000', zIndex: '100',
      padding: '10px'
    }
    let PopImageDiv = {
      width:'100%',
      height: '100px',
      position:'relative',
      background: '#fff'
    }
    let PopImageDivImage = {
      height: '100px',
      left: '50%',
      top: '50%',
      position:'absolute',
      transform:'translate(-50%, -50%)'
    }
    let PopDivTitle = {
      padding: '5px 10px', height: '10px', overflow: 'hidden'
    }

    let ProductGrid = {
      width: '18%',
      display: 'inline-block',
      height: '320px', 
      background: '#ddd', 
      margin:'1%', 
      cursor: 'pointer',
      position:'relative',
      boxShadow: '0px 0px 5px #ddd'
    }
    let ProductGridBg={
      width:'100%',
      height: '100px',
      position:'relative',
      background: '#fff'
    }

    let ProductGridTitle = {
      height:'60px', overflow: 'hidden'
    }

    let LastItem = data && data[data?.length-1];

    const ProductPopup = ({popData, idx}) => {
      return(
        <>
          <div style={PopupDiv}>
              {indexVal !== 0 && (
                <button type="button" style={PrevButton} onClick={onPrevClick}>Prev</button>
              )}
              {LastItem.id !== popData[0].id && (
                <button type="button" style={NextButton} onClick={onNextClick}>Next</button>
              )}
              
             <div style={PopImageDiv}>
                <img src={popData[0].image} alt={popData[0].title} style={PopImageDivImage} />
                </div>
                <h5 style={PopDivTitle}>{popData[0].title}</h5>
               <button type="button" onClick={closePop}>Close</button>
          </div>
        </>
      )
    }

    return (  
      <section>
        <h1>Fake Shop API response:</h1>
        {loading && "Loading..."}
        {!!data && data.length > 0 ? data.map((product, index) => {
            return(
              <>
              <article key={product.id} 
              style={ProductGrid}
              onClick={() => OpenPop(product.id, product, index)}
              >
                <div style={ProductGridBg}>
                <img src={product.image} alt={product.title} style={PopImageDivImage} />
                </div>
                <h5 style={PopDivTitle}>{product.title}</h5>
                <p style={ProductGridTitle}>description: {product.description}</p>
                <p>{product.brand}</p>
                <p>{product.price}</p>
                <p>{product.category}</p>
              </article>
              {open === product.id && (
                <ProductPopup popData={popData} idx={index} />
              )}
              </>
              
            )
               
          }):(<p>API did not provided any product, try again.</p>)
        }
      </section>
      
    )
}

export default MainPage;