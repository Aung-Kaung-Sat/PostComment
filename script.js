/* Post comment praticing */

const commentInputTag = document.querySelector(".commentInput");
const btnTag = document.querySelector(".btn-info");
const btnDangerTag = document.querySelector(".btn-danger");
const commentContainerTag = document.querySelector(".commentContainer");

let postCount = 0;

//  create comment box
const createCommentBox = (commentText) => {
    //  create tags for comment text and text box. Then append to commentContainerTag
    const commentBoxText = document.createElement("div");
    const commentBox = document.createElement("div");
    commentBox.classList.add("commentBox");
    commentBoxText.append(commentText);
    commentBox.append(commentBoxText);
    commentContainerTag.append(commentBox);
    
    //  setting some info to localStorage
    postCount += 1;
    /* တကယ်တော့ ၉၉ခုထိ လုပ်ရတယ်။ ဒါပေမယ့် ၂၀ ထိပဲ limit ထားလိုက်ပါတယ်။ ၉၉ခုထပ်ပိုလုပ်ချင်ရင်တော့ code ၄/၅ ကြောင်းလောက်ထပ်ရေးရင်ရပါတယ်း */
    if (postCount > 20) {
        alert("You can only post 20 comments.")
        return;
    }
    const postCountText = postCount < 10 ? "0" + postCount.toString() : postCount.toString();
    localStorage.setItem(postCountText, commentText);
}

//  callback function to check text exists or not in textarea and run createCommentBox function
const postingComment = () => {
    const postComment = commentInputTag.value;
    if (postComment === "") {
        return
    }
    createCommentBox(postComment);
    commentInputTag.value = "";
}
btnTag.addEventListener("click", postingComment);

btnDangerTag.addEventListener("click", () => {
    localStorage.clear();
    postCount = 0;
    commentContainerTag.innerHTML = "";
})

//  everytime reload the page, show the comment box if we have posted
window.addEventListener("load", () => {
    if (localStorage.length > 0) {
        const localStorageArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            localStorageArray[i] = localStorage.key(i) + localStorage.getItem(localStorage.key(i));   
        }
        //  to show the comment that is posted  in order from first one
        localStorageArray.sort();
        const finalArray = localStorageArray.map((element) => {
            const commentText = element.slice(2, element.length);
            console.log(commentText);
            return commentText
        })
        for (let i = 0; i < finalArray.length; i++) {
            const storageComment = finalArray[i];
            createCommentBox(storageComment);
        }
    }
})