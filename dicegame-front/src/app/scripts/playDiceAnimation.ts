function playDiceAnimation(result: number): void {
    const diceAnim = document.querySelector('.diceAnim') as HTMLElement;
    if(diceAnim){
      (diceAnim.style as CSSStyleDeclaration).animation= 'rolling 1s forwards';
    }
    setTimeout(() => {
      switch (result) {
        case 1:
            diceAnim.style.transform = 'rotateX(0deg) rotateY(0deg)';
            break;

        case 6:
            diceAnim.style.transform = 'rotateX(180deg) rotateY(0deg)';
            break;

        case 2:
            diceAnim.style.transform = 'rotateX(-90deg) rotateY(0deg)';
            break;

        case 5:
            diceAnim.style.transform = 'rotateX(90deg) rotateY(0deg)';
            break;

        case 3:
            diceAnim.style.transform = 'rotateX(0deg) rotateY(90deg)';
            break;

        case 4:
            diceAnim.style.transform = 'rotateX(0deg) rotateY(-90deg)';
            break;

        default:
            break;
      }
      diceAnim.style.animation = 'none';
    }, 0);
    }

    export { playDiceAnimation };