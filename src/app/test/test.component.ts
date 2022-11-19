import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }
   crickArray:any= [
     {
    name:  'BOWLING',
    isFound:false,
   },
     {
       name: 'STUMPED',
       isFound: false
     },
     {
       name: 'FIELDER',
       isFound: false
     },
     {
       name: 'BATSMAN',
       isFound: false
     },
     {
       name: 'RUN OUT',
       isFound: false
     },
     {
       name: 'CATCH',
       isFound: false
     },
     {
       name: 'UMPIRE',
       isFound: false
     },
     {
       name: 'APPEAL',
       isFound: false
     },
     {
       name: 'BATTING',
       isFound: false
     },
     {
       name: 'SPIN',
       isFound: false
     },
     {
       name: 'TEA',
       isFound: false
     },
     {
       name: 'RUNS',
       isFound: false
     },
     {
       name: 'STUMPS',
       isFound: false
     },
     {
       name: 'BOUNDARY',
       isFound: false
     }
   ]
   wordGrid:any =[
    ['O','U','M','B','A','M','R','U','N','O','U','T','F','H','W','N','T'],
    ['S','Z','I','K','Q','R','W','H','Z','Z','T','M','A','T','I','T','E'],
    ['T','H','E','R','U','N','S','H','X','I','L','N','N','H','G','U','A'],
    ['U','D','W','Z','M','Q','F','B','Y','W','R','P','O','S','N','F','O'],
    ['M','T','I','Y','I','C','E','N','J','G','B','O','W','L','I','N','G'],
    ['P','U','G','B','N','A','O','C','R','R','A','X','A','Y','E','P','Q'],
    ['E','Y','B','O','N','N','P','S','P','P','T','Q','W','F','U','J','R'],
    ['D','L','T','C','I','C','Z','T','P','I','S','T','G','K','K','C','E'],
    ['K','Q','S','O','N','Z','A','U','V','I','M','S','J','B','F','A','I'],
    ['L','N','F','Q','G','U','Y','M','I','P','A','S','F','A','F','T','E'],
    ['O','I','S','Q','S','K','S','P','F','H','N','Y','Z','T','N','C','V'],
    ['Q','H','H','K','A','S','V','S','Y','X','U','H','B','T','H','H','B'],
    ['H','C','M','X','J','C','X','A','M','I','V','H','O','I','P','S','J'],
    ['S','U','M','P','I','R','E','W','O','T','V','E','V','N','T','P','H'],
    ['S','Q','H','T','Y','S','V','N','O','Q','S','Y','F','G','J','O','Z'],
    ['H','B','O','U','N','D','A','R','Y','A','Z','W','R','I','F','Y','O'],
    ['Q','S','G','E','D','M','K','S','L','N','O','V','D','E','J','E','D'],
    ['T','D','C','J','E','F','I','E','L','D','E','R','J','H','D','D','M'],
    ['Y','A','R','W','X','A','F','Y','N','Q','S','M','Z','H','D','D','V'],
    ['U','R','J','L','W','Z','G','X','Z','W','S','V','F','U','X','A','H'],
    ['H','S','P','I','N','T','A','G','V','C','V','I','S','D','Z','U','J'],
    ['V','N','H','U','E','V','F','R','V','A','P','P','E','A','L','H','E'],


  ];
   highlightedCoordinates:any={}
   searchForm:any;
   notFound:boolean = false;
   x:any=[-1, -1, -1, 0, 0, 1, 1, 1];

   y:any=[-1, 0, 1, -1, 1, -1, 0, 1];

   rowLen:any;
   colLen:any;


  ngOnInit(): void {
    this.onCheckLen()
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
  }

  onSubmit(){
    let searchString = this.searchForm.get('search')?.value;
    searchString = searchString.toUpperCase();
    if(searchString) {
       for(let i=0;i<this.crickArray.length;i++){
         if(this.crickArray[i].name == searchString){
            this.crickArray[i].isFound = true;
           this.onSearchinMatrix(searchString.replace(/\s/g, ''))
         }

      }

    }
  }

  onSearchinMatrix(value:any){
    for (let row = 0; row<this.wordGrid.length;row++){
      for (let col = 0; col<this.wordGrid[row].length;col++){
        let searchValue= this.search2D(this.wordGrid, row, col, value);
        if(searchValue){
         console.log('pattern found at',  searchValue);
         console.log('starting point', row, col)
          this.onSelectDirection(searchValue, {row:row,col:col}, value)
       }
      }
    }
  }

  onCheckLen(){
    this.rowLen= this.wordGrid?.length;
    this.colLen= this.wordGrid[0]?.length
    console.log(this.rowLen)
    console.log(this.colLen)
  }

  search2D(arr:any,row:any,col:any,word:any){
    let length = word.length
    if(arr[row][col] != word[0]){
      return false;
    }
    for (let dir = 0; dir < 8; dir++){
      let k, rd = row + this.x[dir], cd = col + this.y[dir];
      for ( k = 1; k < length; k++){
        if (rd >= this.rowLen || rd < 0 || cd >= this.colLen || cd < 0){
          break;
        }
        if (arr[rd][cd] != word[k]){
          break;
        }
        rd += this.x[dir];
        cd += this.y[dir];
      }
      if (k == length){
        return {x:this.x[dir], y:this.y[dir]};
      }
    }
    return false;
  }

  onSelectDirection(obj:{x:number, y:number}, startingObj:{row:number,col:number} ,value:string){

     let searchString = value.toUpperCase();
     let len = searchString.length
    console.log(obj)
    console.log(startingObj)

     if(obj.x==0 && obj.y==1){
       for(let i =startingObj.col; i<=startingObj.col+ searchString.length-1;i++){
         this.highlightedCoordinates[`${startingObj.row},${i}`] = true;
       }

     }else if (obj.x ==0 && obj.y == -1){
       for(let i =startingObj.col; i>=startingObj.col- searchString.length+1;i--){
         this.highlightedCoordinates[`${startingObj.row},${i}`] = true;
       }

     } else if (obj.x == 1 && obj.y == 0){
       for(let i =startingObj.row; i<=startingObj.row+ searchString.length-1;i++){
         this.highlightedCoordinates[`${i},${startingObj.col}`] = true;
       }

     } else if (obj.x ==-1 && obj.y ==0){
       for(let i =startingObj.row; i>=startingObj.row- searchString.length+1;i--){
         this.highlightedCoordinates[`${i},${startingObj.col}`] = true;
       }

     } else if (obj.x == 1 && obj.y == 1){
       for(let i =0; i<=searchString.length-1;i++){
         this.highlightedCoordinates[`${startingObj.row+i},${ startingObj.col+i}`]= true
       }

     } else if (obj.x == 1 && obj.y ==-1){
       for(let i =0; i<=searchString.length-1;i++){
         this.highlightedCoordinates[`${startingObj.row+i},${ startingObj.col-i}`]= true
       }

     } else if (obj.x == -1 && obj.y==1){
       for(let i =0; i<=searchString.length-1;i++){
         this.highlightedCoordinates[`${startingObj.row-i},${ startingObj.col+i}`]= true
       }

     } else if(obj.x==-1 && obj.y==-1){
       for(let i =0; i<=searchString.length-1;i++){
         this.highlightedCoordinates[`${startingObj.row-i},${ startingObj.col-i}`]= true
       }
     }
  }

}
