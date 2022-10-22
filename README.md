# JavaScript - Gissa numret

Du använder dig av DOM:en för att interagera med HTML/CSS. Du använder enbart Vanilla JavaScript (inget ramverk/bibliotek). Du stylar i CSS efter egna preferenser, bättre än exempelbilden :-)

## Spelregler

Datorn genererar ett slumpmässigt nummer mellan 0 och 100 (använd Math.random()). 

Spelaren matar in ett tal i en input-ruta, d.v.s det tal som gissas på. 
Om talet är samma som datorns, så får spelaren ett meddelande att man vunnit. 
Om talet är lägre än datorn och över 0 får spelaren ett meddelande om att talet är för lågt.
Om talet är högre än datorn och mindre än 100 får spelaren ett meddelande om att talet är för högt.
Spelaren har 5 chanser på sig att gissa rätt tal.  

## Annat

Det ska finnas med en lista som visar de senaste gissningsförsöken.

## Exempel

![Javascript Number Guessing Game](https://github.com/chasacademy-sandra-larsson/js--number-guessing-game/blob/main/number-guessing-game.png)

## Utöka gissningsspelet genom att du spelar mot en "AI"

Samma gissningsspelet som ovan men nu får användaren en AI att spela mot. Denna AI får också gissa på ett slumptal mellan 1 till 100 m.h.a [Math.random()](https://www.w3schools.com/js/js_random.asp) varpå "tipsen" från båda spelarna skrivs ut. 
Exempelvis:
Den mänskliga spelaren gissar på 37. Programmet skriver ut att 37 är ett för lågt värde, varpå det blir AI:ns tur att gissa. 
AI:n gissar på 56. Programmet skriver ut att 56 är ett för stort värde, varpå det blir den mänskliga spelarens tur att gissa.

AI:n ska också ha tipsen i åtanke. AI:n gissar alltså enbart på relevanta värden. Dvs har tipset om att 37 är för litet kommit fram, så gissar endast AI:n på tal som är 38 eller större. När sedan tipset om att 56 är för stort har kommit fram så gissar endast AI:n på tal från 38 till 55.
