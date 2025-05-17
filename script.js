const token = "";
const username = "YuraKhalus";

async function fetchRepos(){
   const url = `https://api.github.com/users/${username}/repos`;

   try {
      const response =  await fetch(url, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });

      if (!response.ok){
         alert(`Error: ${response.status}`);
         throw new Error(`Error: ${response.status}`);
      }

      const repos = await response.json();

      console.log(repos);
      let i = 1;
      repos.forEach(repo => {
         if (repo.description && repo.topics.includes('done')) {
            console.log(repo);
            
            let data = new Date(repo.updated_at);
            const container_with_projects = document.querySelector('.container_with_projects');
            const box_project = document.createElement('div');
            box_project.classList.add('box_project');
            
            if(i % 2 === 0){
               box_project.classList.add('left');
               i++;
            } else{
               box_project.classList.add('right');
               i++;
            }
            box_project.innerHTML = `
               <div class="box_left">
                  <img src="https://raw.githubusercontent.com/YuraKhalus/fakestore/main/src/img/readme/mainPage.png" alt="Mocap">
               </div>
               <div class="box_right">
                  <div class="box_content">
                     <h3 class="project_title">${repo.name}</h3>
                     <p class="project_description">${repo.description}</p>
                     <div class="tags">
                     ${repo.topics.map(topic => `<span class="tag">${topic}</span>`).join('') }
                     </div>
                     <a href="${repo.html_url}" target="_blank">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M24 19V25C24 25.5304 23.7893 26.0391 23.4142 26.4142C23.0391 26.7893 22.5304 27 22 27H11C10.4696 27 9.96086 26.7893 9.58579 26.4142C9.21071 26.0391 9 25.5304 9 25V14C9 13.4696 9.21071 12.9609 9.58579 12.5858C9.96086 12.2107 10.4696 12 11 12H17" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M21 9H27V15" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M16 20L27 9" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     </a>
                     <a href="${repo.homepage}" target="_blank">
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M24 19V25C24 25.5304 23.7893 26.0391 23.4142 26.4142C23.0391 26.7893 22.5304 27 22 27H11C10.4696 27 9.96086 26.7893 9.58579 26.4142C9.21071 26.0391 9 25.5304 9 25V14C9 13.4696 9.21071 12.9609 9.58579 12.5858C9.96086 12.2107 10.4696 12 11 12H17" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M21 9H27V15" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                           <path d="M16 20L27 9" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     </a>
                  </div>
               </div>


               
               

            `;
            fetchReadme(repo.owner.login, repo.name);
            container_with_projects.appendChild(box_project);
         }
      })

   } catch(error) {
      console.error("Error:", error);
      
   };
}
fetchRepos();




function fetchReadme(owner, repo){
   const url = `https://api.github.com/repos/${owner}/${repo}/readme`

   fetch(url, {
      headers: {
         Authorization: `Bearer ${token}`
      }
   })
   .then(response => response.json())
   .then(data => {
      if(data.content == null){
         return
      }
      const decode = atob(data.content);
      // console.log(decode);
      const mdImages = [...decode.matchAll(/!\[.*?\]\((.*?)\)/g)].map(m => m[1]);
      console.log(mdImages);

      let relative_path = mdImages[0];
      if(mdImages.length > 0){
         relative_path = relative_path.slice(2);
         console.log(relative_path);
      }
      

       
      const imgUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${relative_path}`
      console.log(imgUrl);

      getImg(imgUrl);
      
   })

   // console.log(url);
   
}

function getImg(url){
   let box = document.querySelector('.repo-item');
   box.innerHTML += `<img src="${url}">`;
}














// async function fetchUser() {
//    const url = `https://api.github.com/users/${username}`;

//    try {
//       const response = await fetch(url, {
//          headers: {
//             Authorization: `Bearer ${token}`
//          }
//       });

//       if (!response.ok) {
//          throw new Error(`Error: ${response.status}`);
//       }

//       const user = await response.json();
//       console.log(user);
      
      
//       const userInfoDiv = document.getElementById("user-info");


//       userInfoDiv.innerHTML = `
//          <h2>${user.name || "No name"}</h2>
//          <p><strong>Username:</strong>${user.login}</p>
//          <p><strong>Bio:</strong>${user.bio}</p>
//          <img src="${user.avatar_url}" alt="" style="width: 100px; border-radius: 50%;">
//       `;

//    } catch (error) {
//       console.error("Error:", error);
      
//    };
// }

// fetchUser();
