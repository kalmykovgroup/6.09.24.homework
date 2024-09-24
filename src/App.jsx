import {useEffect, useState} from 'react'
import styles from './App.module.css'
import  './App.css'
import Svg from "./Svg.jsx";
import { HexColorPicker } from "react-colorful";


function App() {
  const [listSize, setListSize] = useState([])
  const [listBrand, setListBrand] = useState([])

  const [color, setColor] = useState("#fff")
  const [brand, setBrand] = useState("No name")



    const [colorChecked, setColorChecked] = useState(false);
    const [brandChecked, setBrandChecked] = useState(false);
    const [sizeChecked, setSizeChecked] = useState(false);


    useEffect(() => {

        // Default options are marked with *
        fetch("http://localhost:3001/data", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.

        }).then(response => response.json())
          .then(data => {
              setListSize(data.size)
              setListBrand(data.brand)
        })



    }, []);

    function sendForm(){
            alert()
    }

  return (

    <>
        <div className={styles.footwearContainer}>
            <div className={styles.brand}>{brand}</div>
            <Svg color={color}/>
        </div>

        <div className={styles.controlContainer}>
            <HexColorPicker style={{display: !colorChecked ? "none" : undefined}} color={color} onChange={setColor}/>
            <select
                onChange={e => setBrand(e.target.value)}
                value={brand}
                className={styles.select} style={{display: !brandChecked ? "none" : undefined}}>
                <option  key={-1}>No name</option>
                {
                    listBrand.map((item, index) =>
                        <option key={index}>
                            {item}
                        </option>)
                }
            </select>

            <select className={styles.size} style={{display: !sizeChecked ? "none" : undefined}}>
                {
                    listSize.map((item, index) =>
                        <option key={index}>
                            {item}
                        </option>)
                }
            </select>
        </div>

        {
            <form className={styles.form}>
                <label>
                    Size:
                    <input type="checkbox" name="size" onChange={() => setSizeChecked(!sizeChecked)}/>
                </label>

                <div className={styles.colorContainer}>
                    <label>
                        Color:
                        <input type="checkbox" name="color"  onChange={() => setColorChecked(!colorChecked)}/>
                    </label>

                </div>

                <label>
                    Brand:
                    <input type="checkbox" name="brand" onChange={() => setBrandChecked(!brandChecked)}/>
                </label>
                <button onClick={() => sendForm()}>Pay</button>
            </form>
        }

    </>
  )
}

export default App
