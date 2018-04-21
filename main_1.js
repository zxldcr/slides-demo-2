let $buttons = $('#spanWrapper>span')
let $slides = $('#slides')
let $images = $slides.children('img')
let current=0

makeFakeSlides()
$slides.css({transform:'translateX(-920px)'})
bindEvents()

$(next).on('click', function(){
    goToSlide(current+1)
  })
$(previous).on('click', function(){
goToSlide(current-1)
})

let timer = setInterval(function(){
goToSlide(current+1)
},2000)
$('.container').on('mouseenter', function(){
window.clearInterval(timer)
}).on('mouseleave', function(){
timer = setInterval(function(){
    goToSlide(current+1)
},2000)
})
  
function bindEvents(){
$('#spanWrapper').on('click', 'span', function(e){
    let $span = $(e.currentTarget) 
    let index = $span.index()
    goToSlide(index)
})
}

//重要
function goToSlide(index){
if(index > $buttons.length-1){
    index = 0
}else if(index <0){
    index = $buttons.length - 1
}
console.log('current', 'index')
console.log(current, index)
if(current === $buttons.length -1 && index === 0){
    // 最后一张到第一张
    console.log('here')
    $slides.css({transform:`translateX(${-($buttons.length + 1) * 920}px)`})
    .one('transitionend', function(){
        $slides.hide()
        $slides.offset() // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行你就会发现 bug，所以只能加上这一行。
        
        $slides.css({transform:`translateX(${-(index+1)*920}px)`}).show()
    })

}else if(current === 0 && index === $buttons.length - 1){
    // 第一张到最后一张
    $slides.css({transform:`translateX(0px)`})
    .one('transitionend', function(){
        $slides.hide().offset()
        $slides.css({transform:`translateX(${-(index+1)*920}px)`}).show()
    })

}else{
    $slides.css({transform:`translateX(${- (index+1) * 920}px)`})
}
current = index
}

function makeFakeSlides(){
let $firstCopy = $images.eq(0).clone(true)
let $lastCopy = $images.eq($images.length-1).clone(true)

$slides.append($firstCopy)
$slides.prepend($lastCopy)
}
  
  

// function makeFakeSlides(){
//     let $firstCopy = $images.eq(0).clone(true) //true表示子元素也克隆
//     let $lastCopy = $images.eq($images.length-1).clone(true)
    
//     $slides.append($firstCopy)
//     $slides.prepend($lastCopy)
// } //这个函数里面$slides是函数外面的变量，这个用法就是闭包



// function bindEvents(){
//     $('#buttonWrappper').on('click','button',function(e){
//         let $button=$(e.currentTarget)
//         let index=$button.index()
//         if(current===$buttons.length-1&&index===0){
//             //最后一张到第一张
//         $slides.css({transform:'translateX(${-($buttons.length+1)*920}px)'})
//             .one('transitionend',function(){
//                 $slides.hide()
//                 .offset()
//                 $slides.css({transform:'translateX(${-(index+1)*920}px)'})
//                 .show()
//             })
//         }else if(current===0&&index===$buttons.length-1){
//             //第一张到最后一张
//             $slides.css({transform:'translateX(0px)'})
//             .one('transitionend',function(){
//                 $slides.hide()
//                 .offset()
//                 $slides.css({transform:'translateX(${-(index+2)*920}px)'})
//                 .show()
//             })
//         }else{
//             $slides.css({transform:'translateX(${-(index+1)*920}px)'})
//         } 
//         current=index    
//     })

    // $buttons.eq(0).on('click',function(){
    //     if(current===2){
    //         $slides.css({transform:'translateX(-1600px)'})
    //         .one('transitionend',function(){
    //             $slides.hide()
    //             .offset()
    //             $slides.css({transform:'translateX(-920px)'})
    //             .show()
    //         })
    //     }else{
    //         $slides.css({transform:'translateX(-920px)'})
    //     }   
    //     current=0
    // })
    // $buttons.eq(1).on('click',function(){
    //     console.log(current)
    //     $slides.css({transform:'translateX(-800px)'})
    //     current=1
    // })
    // $buttons.eq(2).on('click',function(){
    //     if(current===0){
    //         $slides.css({transform:'translateX(0px)'})
    //         .one('transitionend',function(){
    //             $slides.hide()
    //             .offset()
    //             $slides.css({transform:'translateX(-1200px)'})
    //             .show()
    //         })
    //     }else{
    //         $slides.css({transform:'translateX(-920px)'})
    //     }   
    //     current=2
    // })
// }

