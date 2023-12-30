/*
        playerHouse.healer = new Sprite({
            image: game.playerDownImage,
            spritePosition: {
                x: 0,
                y: 0
            },
            gamePosition: {
                x: 356,
                y: 182
            },
            dimensions: {
                width: 48,
                height: 68
            },
            frames: {
                max: 4,
                hold: 10
            },
            sprites: {
                up: game.playerUpImage,
                left: game.playerLeftImage,
                right: game.playerRightImage,
                down: game.playerDownImage,
            }
        })


         //event listener for healer
         game.cvs.addEventListener('click', () => {
            if(game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x + 3,
                    y: game.healer.gamePosition.y
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x - 3,
                    y: game.healer.gamePosition.y
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x,
                    y: game.healer.gamePosition.y + 3
                }}
            }) || game.rectangularCollision({
                rectangle1: game.player, 
                rectangle2: {...game.healer, gamePosition: {
                    x: game.healer.gamePosition.x,
                    y: game.healer.gamePosition.y - 3
                }}
            })
            ){
                //Heals monsters
                const yesBtn = document.createElement("button");
                const noBtn = document.createElement("button");
                dialog.nextBtn.style.display = "none";
                dialog.clearDialog();

                
                dialog.displayDialog("Would you like to heal your monsters?");


                yesBtn.classList.add("yesBtn", "dialogBtn");
                yesBtn.innerHTML = "Yes";
                noBtn.classList.add("noBtn", "dialogBtn");
                noBtn.innerHTML = "No";
            
                yesBtn.addEventListener("click", () => {
                    game.player.team.roster.forEach((monster) => {
                        monster.stats.hp = monster.stats.maxHP;
                    })
                    
                    dialog.clearDialog();
                    dialog.displayDialog("Your monsters are healed!");
                    dialog.nextBtn.style.display = "block";
                })
            
                noBtn.addEventListener("click", () => {
                    dialog.dialogBox.style.display = "none";
                    dialog.nextBtn.style.display = "block";
                })

                dialog.dialogBox.append(yesBtn);
                dialog.dialogBox.append(noBtn);
            }
        })
        
    },
*/