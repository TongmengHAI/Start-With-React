import './App.css'

// import ButtonClickMe from './components/button' // export by default, we can rename it when import
// import { H1, H3, ListName } from './components/head/head' // export by name, we can not rename it when import
// import CategoryCard from './components/category/category'


// import imgCar from './assets/category/car.jpg'
// import imgMotor from './assets/category/motor.jpg'
// import imgLaptop from './assets/category/laptop.jpg'
// import imgPhone from './assets/category/phone.jpg'


// import StateVariable from './components/adding-interactivity/StateVariable'
// import BasicModal from './components/modal/BasicModal'
// import UpdateObjectState from './components/update-object/UpdateObjectState'
import Todo from './components/todo/Todo'

// const category = [
//   { image: imgCar, name: 'Car', price: "100" },
//   { image: imgMotor, name: 'Motor', price: 75 },
//   { image: imgLaptop, name: 'Laptop', price: 50 },
//   { image: imgPhone, name: 'Phone', price: 25 },
// ]
function App() {

  return (
    <>
      <Todo/>

      {/* <UpdateObjectState /> */}


      {/* <BasicModal /> */}

      {/* <StateVariable /> */}

      {/* <H1 />
      <H3 />
      <ListName />
      <h1 style={{ textAlign: 'left' }}>Category</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        {category.map((item, i) => {
          return (
            <CategoryCard key={i} {...item} />
          );
        })}

      </div>
      <div className="myElement"></div> */}


    </>
  )
}

<script type='text/babel'>

</script>

export default App
