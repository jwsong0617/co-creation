
var drawMode; // [0] = landscape, [1] = still_life, [2] = portrait
var isTalkative; // false = silent mode
var task = 0;
var taskText = new Array(3); // [0] = landscape, [1] = still_life, [2] = portrait
var ticker_showed = true;
var isButtonShown = false;
var clip_x, clip_y, clip_w, clip_h; //클립아트 이미지
var clipImg = ['coconut', 'dish', 'nose'];

//init() 에서 초기화
// taskText[0] = ['안녕하세요. 그림을 그려주실래요?',
// '야자나무를 그리는 중이군요!',
// '나머지 부분은 제가 그려볼게요!', //2
// '헤헤, 맘에 드시나요?',
// '그럼 다시 한 번 그려볼게요',
// '그럼 또 다른 야자나무를 하나 더 그려볼게요!', //5 - check for gen
// '헤헤, 맘에 드시나요?',
// '야자나무와 어울리는 코코넛을 그려볼게요!', //7 - check for vae
// '헤헤, 맘에 드시나요?', //8
// '그럼 다시 한 번 그려볼게요',
// '이번이 마지막이에요!',
// '빈 공간에 그림을 더 그려주세요!', //11
// '멋진 그림이네요!',
// '여기 빈 공간이 큰 것 같아요. 뭘 좀 그리는게 어떨까요?',
// '멋지네요! 이제 그림이 꽉 찬것 같아요.',
// '이제 그림에 어울리는 색을 추천해 주세요!']; //15

taskText[0] = ["Hello! Could you draw a picture?",
"You're painting a palm tree!",
"Let me draw the rest of this palm tree!", //2
"Do you like it?",
"If so, I'll try it again.",
"Then I'll try another palm tree!", //5 - check for gen
"Do you like it?",
"Then I'll try to draw coconuts that match these palm trees!", //7 - check for vae
"Do you like it?", //8
"Let me try it again.",
"This is the last time!",
"Please draw more objects freely on the canvas!", //11
"Nice picture!",
"I think it's empty here. Could you draw something more here?",
"Awesome! I think the sketch is now complete!",
"Now, please recommend the colors that match the objects in the picture!"]; //15

taskText[1] = ['안녕하세요. 그림을 그려주실래요?',
'딸기를 그리는 중이군요!',
'나머지 부분은 제가 그려볼게요!', //2
'헤헤, 맘에 드시나요?',
'그럼 다시 한 번 그려볼게요',
'그럼 또 다른 딸기를 하나 더 그려볼게요!', //5
'헤헤, 맘에 드시나요?',
'딸기와 어울리는 접시를 그려볼게요!',
'헤헤, 맘에 드시나요?', //8
'그럼 다시 한 번 그려볼게요',
'이번이 마지막이에요!',
'빈 공간에 그림을 더 그려주세요!', //11
'멋진 그림이네요!',
'여기 빈 공간이 큰 것 같아요. 뭘 좀 그리는게 어떨까요?',
'멋지네요! 이제 그림이 꽉 찬것 같아요.',
'이제 그림에 어울리는 색을 추천해 주세요!']; //15

taskText[2] = ['안녕하세요. 그림을 그려주실래요?',
'눈을 그리는 중이군요!',
'나머지 부분은 제가 그려볼게요!', //2
'헤헤, 맘에 드시나요?',
'그럼 다시 한 번 그려볼게요',
'그럼 또 다른 눈을 하나 더 그려볼게요!', //5
'헤헤, 맘에 드시나요?',
'눈과 어울리는 코를 그려볼게요!',
'헤헤, 맘에 드시나요?', //8
'그럼 다시 한 번 그려볼게요',
'이번이 마지막이에요!',
'빈 공간에 그림을 더 그려주세요!', //11
'멋진 그림이네요!',
'여기 빈 공간이 큰 것 같아요. 뭘 좀 그리는게 어떨까요?',
'멋지네요! 이제 그림이 꽉 찬것 같아요.',
'이제 그림에 어울리는 색을 추천해 주세요!']; //15

//-----------silent mode
var taskText_s = ['안녕하세요. 그림을 그려주실래요?',
'야자나무를 그리는 중이군요!',
'나머지 부분은 제가 그려볼게요!', //2 - setTimeout 5sec
'헤헤, 맘에 드시나요?',
// '그럼 다시 한 번 그려볼게요',
'그럼 또 다른 야자나무를 하나 더 그려볼게요!', //5 - check for gen
'헤헤, 맘에 드시나요?',
'야자나무와 어울리는 코코넛을 그려볼게요!', //7 - check for vae
'헤헤, 맘에 드시나요?', //8
// '그럼 다시 한 번 그려볼게요',
// '이번이 마지막이에요!',
'빈 공간에 그림을 더 그려주세요!', //11 - pen twinkle 3 times
'멋진 그림이네요!',
'여기 빈 공간이 큰 것 같아요. 뭘 좀 그리는게 어떨까요?', //13 - alertWhiteSpace()
'멋지네요! 이제 그림이 꽉 찬것 같아요.',
'이제 그림에 어울리는 색을 추천해 주세요!']; //15 - brush twinkle 3 times]
