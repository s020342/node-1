var table = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9', '+', '/'
]


var decode = function(str) {
    if (!str) {
        return '';
    }

    var len = str.length;
    var i = 0;
    var res = [];

    while (i < len) {
        code1 = table.indexOf(str.charAt(i++));
        code2 = table.indexOf(str.charAt(i++));
        code3 = table.indexOf(str.charAt(i++));
        code4 = table.indexOf(str.charAt(i++));

        c1 = (code1 << 2) | (code2 >> 4);
        c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
        c3 = ((code3 & 0x3) << 6) | code4;

        res.push(String.fromCharCode(c1));

        if (code3 != 64) {
            res.push(String.fromCharCode(c2));
        }
        if (code4 != 64) {
            res.push(String.fromCharCode(c3));
        }

    }

    return UTF8ToUTF16(res.join(''));
}
var UTF8ToUTF16 = function(str) {
    var res = [],
        len = str.length;
    var i = 0;
    for (var i = 0; i < len; i++) {
        var code = str.charCodeAt(i);
        // 对第一个字节进行判断
        if (((code >> 7) & 0xFF) == 0x0) {
            // 单字节
            // 0xxxxxxx
            res.push(str.charAt(i));
        } else if (((code >> 5) & 0xFF) == 0x6) {
            // 双字节
            // 110xxxxx 10xxxxxx
            var code2 = str.charCodeAt(++i);
            var byte1 = (code & 0x1F) << 6;
            var byte2 = code2 & 0x3F;
            var utf16 = byte1 | byte2;
            res.push(Sting.fromCharCode(utf16));
        } else if (((code >> 4) & 0xFF) == 0xE) {
            // 三字节
            // 1110xxxx 10xxxxxx 10xxxxxx
            var code2 = str.charCodeAt(++i);
            var code3 = str.charCodeAt(++i);
            var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
            var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
            utf16 = ((byte1 & 0x00FF) << 8) | byte2
            res.push(String.fromCharCode(utf16));
        } else if (((code >> 3) & 0xFF) == 0x1E) {
            // 四字节
            // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        } else if (((code >> 2) & 0xFF) == 0x3E) {
            // 五字节
            // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
            // 六字节
            // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        }
    }

    return res.join('');
}
var data = decode("eyJ0Ijoi56ys5LiA56ugIOmsvOi9piIsInAiOlsi5Zyo6ICB5Lq655qE5Zue5b+G5Lit77yM6YKj5LiA5aSp6ZW/5rKZ5Yia5Yia5YWl5Yas77yM5bey54S25piv5Y2B5YiG5a+S5Ya377yM5pel5pys5Lq655qE6ZOB6LmE5bey57uP5omT5Yiw6ZW/5rKZ6ZmE6L+R77yM5Z+O6YeM5Y2B5YiG6JCn57Si77yM6KW/5Y2X5pyJ5Lqy5oia55qE5Lq66YO95oqV5aWU5Lqy5oia5Y675LqG77yM5L2G6L+Q5Yqb5pyJ6ZmQ77yM5YWl5Yas5LmL5ZCO5b6A6KW/5Y2X6YO95piv5bGx5L2T5ruR5Z2h77yM5b6I5aSa5Lq66LWw5LqG5Y+I6KKr5Zuw5LqG5Zue5p2l44CCIiwi6aG+5bqG5Liw5b2T5pe26L+Y5piv5Liq5Lit5bm05Lq677yM6LSf6LSj5Zyo5Y2W56Wo5a6k5YC854+t77yM6YKj5aSp5pma5LiK77yM6YKj5YiX6buR6Imy55qEMDc25byA6L+b56uZ55qE5pe25YCZ77yM5q2j5aW95piv5LuW5b2T5YC877yM6YKj5Liq5pe25YCZ77yM5bqU6K+l5LiN5Y+v6IO95Lya5pyJ54Gr6L2m6Z2g56uZ44CC5LuW5Lmf5rKh5pyJ5o+Q5YmN5pS25Yiw5Lu75L2V55qE6YCa55+l44CCIiwi6YKj5Liq5bm05Luj77yM5b6I5aSa5Yab5YiX5Zug5Li65oiY5aSH55qE5Y6f5Zug5b+954S25oq16L6+77yM5Lmf5piv57uP5bi45Y+R55Sf55qE5LqL5oOF44CC5L2G5b6A5b6A5Lya5pyJ5o+Q5YmN6YCa55+l77yM6ICM5LiU77yM5Yab5YiX5LqL5a6c5LiA6Iis55Sx5Yab6Zif57uf566h77yM5q2k5pe25pW05Liq5pyI5Y+w5LiK5bqU6K+l5bey57uP5ruh5piv5YW16K2m5oiS77yM5YeG5aSH5o6l6LSn44CCIiwi5L2G5LuW55yL5Yiw5pyI5Y+w5LiK5LiA5Liq5Lq65Lmf5rKh5pyJ77yM54Gr6L2m5bCx6L+Z5LmI5byA5LqG6L+b5p2l44CC5aaC5p6c5LiN5piv6L+Z5Liq5bqe54S25aSn54mp5LiN5Y+v6YG/5YWN5Zyw5Y+R5Ye65beo5aSn55qE5Yqo6Z2Z77yM5LuW55Sa6Iez6YO95LiN5Lya5Y+R546w44CCIiwi6aG+5bqG5Liw5omT6LW36aOO54Gv77yM5oqr5LiK5Yab5aSn6KGj6LWw5LiK5pyI5Y+w77yM5piP5pqX55qE54Gv5LiL77yM6buR6Imy55qE54Gr6L2m54q55aaC5LiA5p2h5beo6b6Z77yM5qiq5Y2n5Zyo5pyI5Y+w5LiA5L6n77yM6Lqr5LiK5ruh5piv5bmy5rOl5ZKM6ZSI5paR77yM54q55aaC5oyW5o6Y5Ye65p2l55qE6IWQ54OC6b6Z6bOe44CC5LuW5o2P5LqG5LiA5oqK5bmy5rOl77yM5LiH5YiG55qE55aR5oOR44CCIiwi4oCc5ZOq5YS/5p2l55qE54Gr6L2m6I6rP+KAnSIsIuS7luijuee0p+Wkp+iho+i1sOWIsOemu+eBq+i9pui/keS4gOeCueeahOWcsOaWue+8jOaDiuiutueahOWPkeeOsOeBq+i9pueahOaJgOaciei9puWOou+8jOWMheaLrOi9puWktO+8jOWFqOaYr+mTgeearueEiuatu+eahO+8jOS4kemZi+eahOeEiuaOpee8nemameeyl+Wkp+S4lOa7oeaYr+awlOazoe+8jOivtOaYjueEiuaOpeeahOaXtuWAmeWvueeEiueoi+W6pueoi+axgumdnuW4uOmrmO+8jOS7lueUqOiCmOmDqOmTsuaOieimhuebluWcqOi9puearuS4iueahOazpeW3tO+8jOeci+WIsOeBq+i9puWktOS4iueahOa2guijheWSjDA3NueahOWtl+S9k++8jOS7luaEj+ivhuWIsO+8jOi/meaYr+S4gOi+huaXpeacrOS6uueahOWGm+WIl+OAgiIsIui/meenjeWGm+WIl+mDveaYr+aXpeacrOS+teWNjuacn+mXtOWcqOS4nOWMl+mAoOeahO+8jOS4gOW6puW8gOWIsOilv+WMl++8jOWQjuadpee8tOiOt+S6huS4jeWwke+8jOeOsOWcqOmDveW9kuWbveawkeaUv+W6nOeuoei+lumHjeaWsOa2guijhe+8jOS9huaYr+i/meS4gOWIl++8jOikquiJsueahOaXpeacrOWGm+aXl+eahOWbvuahiOi/mOWNsOWcqOi9puWktOS4pOi+ueOAgui9pui6q+WQhOS4qumDqOWIhumDveacieWkp+mHj+eahOmTgemUiOWSjOW5sua3pOazpe+8jOeugOebtOWDj+aYr+WDj+iiq+Wfi+WcqOWcsOmHjO+8jOacgOi/keaJjeiiq+WIqOWHuuadpeeahOOAgiIsIuS7juS4nOWMl+aWueWQkeW8gOadpeeahOmTgei3r+aXqeWwseiiq+eCuOaWreS6hu+8jOeOsOWcqOiBlOmAmumVv+aymeeahO+8jOWPquacieilv+WNl+WHoOadoemTgei9qO+8jOmDveW3sue7j+iiq+WGm+mYn+W+geeUqOS6hu+8jOS9hueci+i9puWktOeahOacneWQke+8jOehruWunuaYr+S7juS4nOWMl+aWueWQkeW8gOadpeeahO+8jOi/meWdqOmTgeWYjui+vuaAjuS5iOmjnui/h+iiq+eCuOeDgueahOmTgei3r+ahpeeahO+8nyIsIuKAnOmsvOWEv+WtkO+8jOi9puS4iuaYr+WTquS4qioqKirvvJ/igJ3pob7luobkuLDmlbLkuobmlbLovabnmq7vvIzlr7nnnYDlm5vlkajllorpgZPvvJrigJzojqvlgZzlnKjov5nlhL/mkpLvvIzlkI7pnaLngavovabmnaXllr3vvIzkvaDlsYHmlabopoHooqvlkqzllr3jgILliY3pnaLmnInkuKrpk4HovajvvIzlho3lvoDliY3lvIDngrnmkpLjgILigJ0iLCLngavovabkuIrkuIDngrnlo7Dpn7PkuZ/msqHmnInvvIzlm5vlkajkuZ/kuI3op4HmnInngavovabkuIrkuIvmnaXnmoTkurrvvIzku5botbDliLDngavovablpLTvvIzmlIDniKzkuobkuIrljrvvvIzmg4rorrbnmoTlj5HooYzngavovablpLTnmoTpl6jkuZ/mmK/nhIrmrbvnmoTvvIzokrjmsb3ng5/lm7Hlm5vlkajov5jmmK/mu5rng6vnmoTjgILov5nkuIDlnZfmuKnluqblj5jljJbvvIzotbfkuobpnLLvvIzovabouqvlvojmva7mub/vvIzkuIDmirnkuIDmiYvnmoTnuqLplIjmsLTvvIzlg4/lnKjmuJfooYDkuIDmoLfjgIIiLCLpob7luobkuLDmnInngrnlrrPmgJXotbfmnaXvvIznnIvmm7TpgqPkuYjlpJrlubTvvIzlsJHmnInov5nkuYjlpYfmgKrnmoTkuovvvIzku5bkuZ/mnIDov5HlkKzopb/ljJfnmoTkurror7TvvIzngavovabnq5nmnInljYrlpJzlvIDov5vmnaXkuIDkupvmsqHmnInkurrnmoTovabvvIzkuIDmn7vov5nkupvovabpg73mmK/ooqvml6XmnKzkurrngrjmjonnmoTovabvvIzkvYbovabkuIrkuIDkuKrkurrkuZ/msqHmnInjgILpg73or7TmmK/prLzovabovb3nnYDooqvngrjmrbvnmoTkurrlnKjlvIDov5vpmLTmm7nlnLDlupzliY3miorkurrlhYjpgIHlm57mlYXkuaHjgILkuIDliLDml6nkuIrvvIzovablsLHmtojlpLHkuI3op4HvvIzlpb3lg4/ku47mnaXmsqHmnInlh7rnjrDov4fkuIDmoLfjgIIiLCLlvojlpJrovabpg73mmK/ooqvngrjloYznmoTlsbHlnJ/ln4vlnKjlsbHlnbPph4zvvIzpmr7mgKrmnInov5nkuYjlpJrlnJ/jgIIiLCLku5blkLzkuoblh6Dlo7Dmg7Plj6vphpLorabljavvvIzlv73nhLbvvIzku5blkKzliLDngavovablpLTph4zvvIzmnInmiZHohb7nmoTlo7Dpn7PjgILngavovablpLTnmoTnqpflrZDooqvms6Xlt7Tns4rkvY/kuobvvIzku5bnlKjlipvmirnlvIDms6Xlt7TvvIzmiqzotbfpo47nga/jgILkuIDkuIvvvIzku5bnnIvliLDmtZHmtYrnmoTnqpfnjrvnkoPph4zlpLTvvIzokpnnnYDku4DkuYjkuJzopb/vvIzkvLzkuY7mmK/kuIDlvKDmg6jnmb3nmoTnjKrnmq7vvIznu7fntKfkuobljIXlnKjnjrvnkoPkuIrvvIzmiorph4zpnaLpg73pga7kuobotbfmnaXjgIIiLCLnjKrnmq7kuIrpnaLvvIzmnInkuIDmnaHnu4bnvJ3vvIzlpKfmpoLmnInlt7Tmjozlrr3vvIzpob7luobkuLDliqrlipvmg7PotLTov5Hnu4bnvJ3vvIzmg7PpgJrov4fov5nmnaHnvJ3pmpnnnIvnnIvph4zpnaLmmK/ku4DkuYjkuJzopb/jgIIiLCLpo47nga/kuI3lgZznmoTmiZPlnKjnjrvnkoPkuIrvvIzmkp7kuIvlubLlnJ/vvIzpk4HplIjlkozms6XohaXorqnku5bkvZzlkZXvvIzku5blj5HnjrDpgqPmnaHnvJ3pmpnvvIzmnInkupvlvILmoLfjgIIiLCLku5bnnK/otbfnnLznnZvnu4bnnIvvvIzov5nlvKDigJznmq7igJ3lpKfmpoLmmK/ooqvpo47nga/mkp7nmoTmnb7liqjkuobvvIzkuIDkuIvmjonokL3kuobkuIvljrvvvIznnqzpl7TvvIzku5bnnIvliLDkuobngavovablpLTlhoXvvIzmnInkuIDkuKrmgqzmta7nnYDnmoTkurrjgILmvILlnKjnqbrkuK3jgILlho3nnIvvvIzku5blsLHmhI/or4bliLDvvIzpgqPmmK/kuIDkuKrlkIrmrbvnmoTkurrvvIznqb/nnYDmma7pgJrnmoTlirPlt6XmnI3lkIrlnKjngavovabpobbkuIrvvIzlsLjkvZPlhrflhrfnmoTnnIvnnYDku5bjgILkuKTlj6rmtZHmtYrnmoTnnLznnZvph4zvvIznnLznj6DmnoHlsI/vvIznirnlpoLpu4TosYbpgqPkuYjlpKfvvIzliankuIvnmoTpg73mmK/nnLznmb3jgIIiLCLpob7luobkuLDnrKzkuIDnnLzlj6rnnIvliLDpgqPlj4zku6Tkurrmr5vpqqjmgprnhLbnmoTnnLznnZvvvIzku5blpKflj6vkuIDlo7DvvIznv7vkuIvngavovabvvIzmkZTlnKjmnIjlj7DkuIrvvIznv7vouqvniKzotbfmnaXvvIzlsLHlvoDorabljavlrqTniKzljrvjgILku5blv4Pph4zlj6rmnInkuIDkuKrlv7XlpLTvvJrov5nmmK/ovobprLzovabvvIzopoHliLDplb/mspnmnaXmi4nkurrkuobjgIIiXX0=")


console.log(data)