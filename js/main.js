const lists = document.querySelectorAll('.list')
const button = document.querySelector('.button')


function addTask () {
    const btn = document.querySelector('.add__btn')
    const addBtn =  document.querySelector('.add__item-btn')
    const cancelBtn =  document.querySelector('.cancel__item-btn')
    const textarea = document.querySelector('.textarea')
    const form = document.querySelector('.form')

    let  value;

    btn.addEventListener('click', () => {
        form.style.display ='block'
        btn.style.display = 'none'
        addBtn.style.display = 'none'

        textarea.addEventListener('input', e =>{
            value = e.target.value

            if(value){
                addBtn.style.display ='block'
            }else{
                addBtn.style.display ='none'
            }
        })
    })

    cancelBtn.addEventListener('click', () =>{
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'flex'
    })

    addBtn.addEventListener('click', () =>{
        const newItem = document.createElement('div')
        newItem.classList.add('list__item')
        newItem.draggable = true
        newItem.textContent = value;
        lists[0].append(newItem)

        value= ''
        textarea.value =''

        form.style.display = 'none'
        btn.style.display = 'flex'
    

        dragNdrop()
    })
}


addTask()

function addBoard() {
    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards__item')
    board.innerHTML=`
        <span contenteditable="true" class="title">Enter a title</span><a href="#" class="delete"><img src="./images/delete.png" width="20" height="20">Delete board</a>
        <div class="list"></div>
    `
    let items = document.querySelectorAll('.boards__item')
    if(items.length <= 7){
        boards.append(board)
    }
    


    changeTitle()
    dragNdrop()   
    delBoard()
}

button.addEventListener('click', addBoard)


function changeTitle(){
    const titles = document.querySelectorAll('.title')

    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '')
    })

}

changeTitle()

let draggedItem = null

function dragNdrop(){
    const listItems = document.querySelectorAll('.list__item')
    const lists =document.querySelectorAll('.list')

    for(let i = 0; i < listItems.length; i++){
        const item = listItems[i];

        item.addEventListener('dragstart', () =>{
            draggedItem = item
            setTimeout(() =>{
                item.style.display = 'none'
            }, 0)
        })

        item.addEventListener('dragend', () =>{
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            })
        })

        item.addEventListener('dblclick', () =>{
            item.remove()
        })

        for(let g = 0; g < lists.length; g++){
            const list = lists[g]

            list.addEventListener('dragover', e => e.preventDefault())

            list.addEventListener('dragenter', function(e){
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0,0.3)'
            })

            list.addEventListener('dragleave',function(e){
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
            })
            
            list.addEventListener('drop', function(e){
                this.style.backgroundColor = 'rgba(0,0,0, 0)'
                this.append(draggedItem)
            })
        }

    }

}

dragNdrop()


function delBoard() {
	const boards = document.querySelectorAll('.boards__item')
    const delButtons = document.querySelectorAll('.delete')

	for (let i = 0; i < boards.length; i++) {
		const board = boards[i];
        const del = delButtons[i]
        console.log(del)
		del.addEventListener('click', () => {
			board.remove()
		})
	}
}

delBoard()