const mine_rates = document.querySelectorAll('.mine-rates a')
const not_mine_rates = document.querySelectorAll('.not-mine-rates a')
const mine_value = document.querySelector('.mine-value input')
const not_mine_value = document.querySelector('.not-mine-value input')
const left_text = document.querySelector('.left-text')
const right_text = document.querySelector('.right-text')
let base = ''
let symbols = ''
let my_data = {}



const getData = async () => {
    if(base !== '' && symbols !== '' ){
        const response = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
        const data = await response.json()
        my_data = data
        not_mine_value.value = +mine_value.value * my_data.rates[`${symbols}`]
        left_text.textContent = `1 ${base} = ${my_data.rates[`${symbols}`]} ${symbols}`
        right_text.textContent = `1 ${symbols} = ${1/my_data.rates[`${symbols}`]} ${base}`
    }
    else{
        return
    }
}

mine_rates.forEach((rate) => {
    if(rate.classList.contains('active')){
        base=rate.textContent
        getData()
    }
    rate.addEventListener('click', (e) => {
        let current = document.querySelector(".mine-rates .active");
        current.classList.remove("active");
        rate.classList.add('active')
        e.preventDefault()
        base = rate.textContent
        getData()
    })
})

not_mine_rates.forEach((rate) => {
    if(rate.classList.contains('active')){
        symbols=rate.textContent
        getData()
    }
    rate.addEventListener('click', (e) => {
        let current = document.querySelector(".not-mine-rates .active");
        current.classList.remove("active");
        rate.classList.add('active')
        e.preventDefault()
        symbols = rate.textContent 
        getData()
    })
})

mine_value.addEventListener('input', (e) => {
    console.log(e.target.value)
    not_mine_value.value = +e.target.value * my_data.rates[`${symbols}`]
    if(mine_value.value[0] == 0 && mine_value.value[1] == 0){
        mine_value.value = e.target.value.slice(1)
    }
    if(mine_value.value === ''){
        not_mine_value.value = ''
    }
   
})

not_mine_value.addEventListener('input', (e) => {
    mine_value.value = +e.target.value / my_data.rates[`${symbols}`]
    if(not_mine_value.value === ''){
        mine_value.value = ''
    }
})

getData()