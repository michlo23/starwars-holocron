#!/usr/bin/env python3
"""Expand the 10 short posts to full-length articles matching the original 5."""
import json
import os

POSTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'posts.json')

with open(POSTS_FILE) as f:
    posts = json.load(f)

# Full content for each post
full_content = {}

full_content["ahsoka-tano"] = {
    "content_en": (
        "Ahsoka Tano began as Anakin Skywalker's headstrong Padawan during the Clone Wars "
        "and evolved into one of the most compelling figures in Star Wars history. Her journey "
        "from eager young Jedi to disillusioned warrior to independent Force-wielder mirrors "
        "the galaxy's own turbulent transformation.\n\n"
        "During the Clone Wars, Ahsoka proved herself an exceptional commander and fighter. "
        "She led clone troopers in battle, faced Sith assassins, and earned the respect of "
        "seasoned generals. But her defining moment came when the Jedi Council wrongly accused "
        "her of terrorism. Though eventually cleared, the experience shattered her faith in "
        "the Order.\n\n"
        "Her departure from the Jedi\u2014walking down the Temple steps while Anakin watched "
        "helplessly\u2014remains one of the most emotionally devastating scenes in Star Wars. "
        "She left not because she stopped believing in the Force, but because she stopped "
        "believing in the institution.\n\n"
        "After Order 66, Ahsoka survived by hiding her identity, eventually becoming the "
        "covert operative \"Fulcrum\" for the nascent Rebel Alliance. Her white lightsabers, "
        "purified from an Inquisitor's red crystals, symbolize her unique position: wielding "
        "the Force without allegiance to either Jedi dogma or Sith corruption.\n\n"
        "Her confrontation with Darth Vader in the Sith temple on Malachor\u2014facing her "
        "former master consumed by the dark side\u2014is heartbreaking. \"I am no Jedi,\" she "
        "declares, refusing to abandon him even as she fights for her life.\n\n"
        "**Fun Fact:** Ahsoka was originally conceived as a one-off character for the Clone "
        "Wars movie but became so popular that Dave Filoni expanded her role across three "
        "animated series and a live-action show."
    ),
    "content_pl": (
        "Ahsoka Tano zaczyna\u0142a jako porywcza Padawan Anakina Skywalkera w czasie Wojen "
        "Klon\u00f3w i wyros\u0142a na jedn\u0105 z najbardziej fascynuj\u0105cych postaci w "
        "historii Star Wars. Jej droga od gorliwej m\u0142odej Jedi, przez rozczarowan\u0105 "
        "wojowniczk\u0119, po niezale\u017cn\u0105 w\u0142adaj\u0105c\u0105 Moc\u0105 "
        "odzwierciedla burzliw\u0105 transformacj\u0119 samej galaktyki.\n\n"
        "Podczas Wojen Klon\u00f3w Ahsoka udowodni\u0142a, \u017ce jest wyj\u0105tkow\u0105 "
        "dow\u00f3dczyni\u0105 i wojowniczk\u0105. Prowadzi\u0142a \u017co\u0142nierzy "
        "klon\u00f3w do bitwy, stawia\u0142a czo\u0142a sitha\u0144skim zab\u00f3jcom i "
        "zdoby\u0142a szacunek do\u015bwiadczonych genera\u0142\u00f3w. Ale jej definiuj\u0105cy "
        "moment nast\u0105pi\u0142, gdy Rada Jedi fa\u0142szywie oskar\u017cy\u0142a j\u0105 "
        "o terroryzm. Cho\u0107 ostatecznie oczyszczona z zarzut\u00f3w, do\u015bwiadczenie "
        "to roztrzsaka\u0142o jej wiar\u0119 w Zakon.\n\n"
        "Jej odej\u015bcie od Jedi\u2014schodz\u0105cej po stopniach \u015awi\u0105tyni, "
        "podczas gdy Anakin patrzy\u0142 bezradnie\u2014pozostaje jedn\u0105 z najbardziej "
        "emocjonalnie druzgoc\u0105cych scen w Star Wars. Odesz\u0142a nie dlatego, \u017ce "
        "przesta\u0142a wierzy\u0107 w Moc, ale dlatego, \u017ce przesta\u0142a wierzy\u0107 "
        "w instytucj\u0119.\n\n"
        "Po Rozkazie 66 Ahsoka przetrwa\u0142a, ukrywaj\u0105c swoj\u0105 to\u017csamo\u015b\u0107, "
        "ostatecznie staj\u0105c si\u0119 tajn\u0105 agentk\u0105 \u201eFulcrum\u201d dla "
        "rodz\u0105cej si\u0119 Rebelii. Jej bia\u0142e miecze \u015bwietlne, oczyszczone "
        "z czerwonych kryszta\u0142\u00f3w Inkwizytora, symbolizuj\u0105 jej wyj\u0105tkow\u0105 "
        "pozycj\u0119: w\u0142adanie Moc\u0105 bez przynale\u017cno\u015bci do dogmatu Jedi "
        "czy korupcji Sith\u00f3w.\n\n"
        "Jej konfrontacja z Darthem Vaderem w \u015bwi\u0105tyni Sith\u00f3w na Malachorze\u2014"
        "twarz\u0105 w twarz z by\u0142ym mistrzem poch\u0142oni\u0119tym przez ciemn\u0105 "
        "stron\u0119\u2014\u0142amie serce. \u201eNie jestem Jedi\u201d, o\u015bwiadcza, "
        "odmawiaj\u0105c porzucenia go nawet walcz\u0105c o w\u0142asne \u017cycie.\n\n"
        "**Ciekawostka:** Ahsoka zosta\u0142a pierwotnie wymy\u015blona jako jednorazowa "
        "posta\u0107 do filmu Wojny Klon\u00f3w, ale sta\u0142a si\u0119 tak popularna, "
        "\u017ce Dave Filoni rozszerzy\u0142 jej rol\u0119 na trzy serie animowane i serial aktorski."
    ),
}

full_content["grand-admiral-thrawn"] = {
    "content_en": (
        "Grand Admiral Thrawn, born Mitth'raw'nuruodo of the Chiss Ascendancy, is the Empire's "
        "most brilliant military strategist and its most unlikely leader. In an Empire built on "
        "human supremacy, a blue-skinned alien with glowing red eyes rose to the highest rank "
        "in the Imperial Navy through sheer tactical genius.\n\n"
        "Thrawn's signature method is cultural analysis through art. He studies the paintings, "
        "music, architecture, and crafts of a species to understand their psychology, values, "
        "and blind spots. This isn't mere appreciation\u2014it's weaponized anthropology. By "
        "understanding how a people express beauty and meaning, Thrawn predicts how they'll "
        "fight, flee, and surrender.\n\n"
        "His campaigns against the Rebel Alliance demonstrated this philosophy ruthlessly. "
        "Where other Imperial commanders relied on overwhelming firepower, Thrawn used precise, "
        "surgical strikes informed by deep understanding of his opponents. He turned Phoenix "
        "Squadron's strengths against them, anticipated Hera Syndulla's tactics, and nearly "
        "crushed the Rebellion on Lothal.\n\n"
        "What makes Thrawn compelling isn't just his intellect\u2014it's his courtesy. He's "
        "polite, appreciative of talent, and genuinely fascinated by other cultures. He's a "
        "villain you almost want to succeed.\n\n"
        "**Fun Fact:** Thrawn was created by author Timothy Zahn in 1991 for 'Heir to the Empire,' "
        "the novel that revived Star Wars fiction and essentially created the Expanded Universe."
    ),
    "content_pl": (
        "Wielki Admira\u0142 Thrawn, urodzony jako Mitth'raw'nuruodo z Dominium Chiss\u00f3w, "
        "jest najgenialniejszym strategiem wojskowym Imperium i jego najbardziej nieoczekiwanym "
        "przyw\u00f3dc\u0105. W Imperium zbudowanym na ludzkiej supremacji, niebiesksk\u00f3ry "
        "obcy z p\u0142on\u0105cymi czerwonymi oczami wzni\u00f3s\u0142 si\u0119 na najwy\u017csz\u0105 "
        "rang\u0119 w Imperialnej Marynarce dzi\u0119ki samemu geniuszowi taktycznemu.\n\n"
        "Metoda Thrawna to analiza kulturowa przez sztuk\u0119. Studiuje malarstwo, muzyk\u0119, "
        "architektur\u0119 i rzemios\u0142o gatunku, by zrozumie\u0107 jego psychologi\u0119, "
        "warto\u015bci i s\u0142abe punkty. To nie jest zwyk\u0142e podziwianie\u2014to "
        "uzbrojona antropologia. Rozumiej\u0105c, jak lud wyra\u017ca pi\u0119kno i sens, "
        "Thrawn przewiduje, jak b\u0119d\u0105 walczy\u0107, ucieka\u0107 i kapitulowa\u0107.\n\n"
        "Jego kampanie przeciwko Rebelii demonstrowa\u0142y t\u0119 filozofi\u0119 bezlito\u015bnie. "
        "Gdzie inni imperialni dow\u00f3dcy polegali na przygniataj\u0105cej sile ognia, Thrawn "
        "stosowa\u0142 precyzyjne, chirurgiczne uderzenia oparte na g\u0142\u0119bokim zrozumieniu "
        "przeciwnik\u00f3w.\n\n"
        "To, co czyni Thrawna fascynuj\u0105cym, to nie tylko jego intelekt\u2014to jego "
        "uprzejmo\u015b\u0107. Jest grzeczny, docenia talent i jest szczerze zafascynowany "
        "innymi kulturami. To z\u0142oczy\u0144ca, kt\u00f3remu prawie chcesz kibicowa\u0107.\n\n"
        "**Ciekawostka:** Thrawn zosta\u0142 stworzony przez Timothy'ego Zahna w 1991 roku dla "
        "powie\u015bci 'Heir to the Empire,' kt\u00f3ra o\u017cywi\u0142a fikcj\u0119 Star Wars "
        "i w zasadzie stworzy\u0142a Expanded Universe."
    ),
}

full_content["order-66"] = {
    "content_en": (
        "Order 66 was the most devastating betrayal in galactic history. With three words\u2014"
        "\"Execute Order 66\"\u2014Chancellor Palpatine activated a contingency protocol hidden "
        "in the biochips of every clone trooper, compelling them to kill their Jedi commanders "
        "without hesitation or mercy.\n\n"
        "The horror wasn't just in the killing. It was in the intimacy of the betrayal. Jedi "
        "and clones had fought side by side for three years of brutal warfare. They had saved "
        "each other's lives, shared meals, mourned fallen comrades. Commander Cody, who had "
        "served loyally with Obi-Wan Kenobi through countless campaigns, tried to blast him "
        "off a cliff without a moment's pause.\n\n"
        "Across the galaxy, the purge unfolded simultaneously. Ki-Adi-Mundi fell on Mygeeto, "
        "cut down by the troopers he was leading into battle. Aayla Secura was shot in the back "
        "on Felucia. Young Padawans in the Jedi Temple were slaughtered by Darth Vader himself\u2014"
        "a man they had known as Anakin Skywalker, hero of the Republic.\n\n"
        "The cruelty of Order 66's design was its perfection. The biochips removed choice from "
        "the clones\u2014most would have refused otherwise. Some, like Captain Rex, resisted long "
        "enough for the chip to be removed, but they were rare exceptions.\n\n"
        "**Fun Fact:** The inhibitor chip concept was added by The Clone Wars series. In the "
        "original films, clones simply followed orders\u2014the series added moral complexity "
        "by showing it wasn't their choice."
    ),
    "content_pl": (
        "Rozkaz 66 by\u0142 najbardziej druzgoc\u0105c\u0105 zdrad\u0105 w galaktycznej historii. "
        "Trzema s\u0142owami\u2014\u201eWykona\u0107 Rozkaz 66\u201d\u2014Kanclerz Palpatine "
        "aktywowa\u0142 ukryty w biochipach ka\u017cdego \u017co\u0142nierza klona protok\u00f3\u0142, "
        "zmuszaj\u0105cy ich do zabicia swoich dow\u00f3dc\u00f3w Jedi bez wahania czy lito\u015bci.\n\n"
        "Groza nie tkwi\u0142a tylko w zabijaniu. Tkwi\u0142a w intymno\u015bci zdrady. Jedi i "
        "klony walczyli rami\u0119 w rami\u0119 przez trzy lata brutalnej wojny. Ratowali sobie "
        "nawzajem \u017cycie, dzielili posi\u0142ki, op\u0142akiwali poleg\u0142ych towarzyszy. "
        "Dow\u00f3dca Cody pr\u00f3bowa\u0142 zestrzeli\u0107 Obi-Wana z klifu bez chwili wahania.\n\n"
        "W ca\u0142ej galaktyce czystka rozwija\u0142a si\u0119 jednocze\u015bnie. Ki-Adi-Mundi "
        "pad\u0142 na Mygeeto. Aayla Secura zosta\u0142a zastrzelona w plecy na Felucii. M\u0142odzi "
        "Padawani w \u015awi\u0105tyni Jedi zostali wymordowani przez samego Dartha Vadera\u2014"
        "cz\u0142owieka, kt\u00f3rego znali jako Anakina Skywalkera.\n\n"
        "Okrucie\u0144stwo Rozkazu 66 tkwi\u0142o w jego doskona\u0142o\u015bci. Biochipy "
        "odebra\u0142y klonom wyb\u00f3r\u2014wi\u0119kszo\u015b\u0107 z nich odm\u00f3wi\u0142aby. "
        "Niekt\u00f3rzy, jak Kapitan Rex, oparli si\u0119 wystarczaj\u0105co d\u0142ugo, by "
        "chip m\u00f3g\u0142 zosta\u0107 usuni\u0119ty, ale byli rzadkimi wyj\u0105tkami.\n\n"
        "**Ciekawostka:** Koncepcja chip\u00f3w hamuj\u0105cych zosta\u0142a dodana przez serial "
        "Wojny Klon\u00f3w. W oryginalnych filmach klony po prostu wykonywa\u0142y rozkazy\u2014"
        "serial doda\u0142 moraln\u0105 z\u0142o\u017cono\u015b\u0107."
    ),
}

full_content["ebon-hawk"] = {
    "content_en": (
        "The Ebon Hawk is the Millennium Falcon's spiritual ancestor\u2014a nimble, heavily "
        "modified freighter that carried some of the Old Republic's most important figures across "
        "the galaxy during its darkest hours. Like its successor thousands of years later, the "
        "Hawk was fast, tough, and perpetually in need of repair.\n\n"
        "Originally a smuggling vessel, the Ebon Hawk passed through numerous owners before "
        "becoming intertwined with the fate of Revan. During the Jedi Civil War, the ship served "
        "as base of operations as Revan's crew searched for the Star Maps leading to the Star Forge.\n\n"
        "The Hawk's design reflects an era of rougher, more industrial starship construction. "
        "Lacking the Falcon's smooth curves, the Ebon Hawk has an angular, utilitarian appearance\u2014"
        "a ship built for function over form. Her cargo holds had been converted into hidden "
        "compartments, her engines modified for speed, and her weapons upgraded for combat.\n\n"
        "What makes the Ebon Hawk special isn't her specifications\u2014it's the conversations "
        "that happened aboard her. The ship's main hold became a gathering point for some of the "
        "most diverse crews in Star Wars history: Jedi, Sith, soldiers, droids, and Mandalorians "
        "debating philosophy, purpose, and the nature of the Force.\n\n"
        "**Fun Fact:** The Ebon Hawk was deliberately designed to evoke the Millennium Falcon "
        "in Knights of the Old Republic, giving players that same sense of 'home base' that "
        "Han Solo's ship provided in the films."
    ),
    "content_pl": (
        "Ebon Hawk to duchowy przodek Soko\u0142a Millennium\u2014zwinny, mocno zmodyfikowany "
        "frachtowiec, kt\u00f3ry wi\u00f3z\u0142 jedne z najwa\u017cniejszych postaci Starej "
        "Republiki przez galaktyk\u0119 w jej najciemniejszych godzinach. Podobnie jak jego "
        "nast\u0119pca tysi\u0105ce lat p\u00f3\u017aniej, Hawk by\u0142 szybki, wytrzyma\u0142y "
        "i nieustannie potrzebuj\u0105cy naprawy.\n\n"
        "Pocz\u0105tkowo statek przemytniczy, Ebon Hawk przeszed\u0142 przez r\u0119ce licznych "
        "w\u0142a\u015bcicieli, zanim jego los spl\u00f3t\u0142 si\u0119 z losem Revana. Podczas "
        "Jedia\u0144skiej Wojny Domowej statek s\u0142u\u017cy\u0142 jako baza operacyjna za\u0142ogi "
        "Revana poszukuj\u0105cej Map Gwiezdnych.\n\n"
        "Design Hawka odzwierciedla er\u0119 bardziej surowej, industrialnej konstrukcji statk\u00f3w. "
        "Pozbawiony g\u0142adkich krzywych Falcona, Ebon Hawk ma kanciasty, utylitarny wygl\u0105d\u2014"
        "statek zbudowany dla funkcji, nie formy. \u0141adownie przerobione na schowki, silniki "
        "zmodyfikowane pod pr\u0119dko\u015b\u0107, bro\u0144 ulepszona do walki.\n\n"
        "To, co czyni Ebon Hawka wyj\u0105tkowym, to nie jego specyfikacja\u2014to rozmowy na "
        "pok\u0142adzie. G\u0142\u00f3wna \u0142adownia sta\u0142a si\u0119 miejscem spotka\u0144 "
        "jednych z najbardziej zr\u00f3\u017cnicowanych za\u0142\u00f3g: Jedi, Sithowie, "
        "\u017co\u0142nierze, droidy i Mandalorianie debatuj\u0105cy o filozofii i Mocy.\n\n"
        "**Ciekawostka:** Ebon Hawk zosta\u0142 celowo zaprojektowany, by przypomina\u0107 "
        "Soko\u0142a Millennium w KOTOR, daj\u0105c graczom to samo poczucie \u201ebazy\u201d."
    ),
}

full_content["siege-of-mandalore"] = {
    "content_en": (
        "The Siege of Mandalore is the Clone Wars' masterpiece finale\u2014a battle that unfolds "
        "simultaneously with the events of Revenge of the Sith, lending devastating context to "
        "both stories. While Anakin Skywalker falls to the dark side on Coruscant, Ahsoka Tano "
        "fights for survival on Mandalore.\n\n"
        "Ahsoka, no longer officially a Jedi, leads a division of the 501st Legion\u2014clone "
        "troopers who painted their helmets orange in her honor\u2014against Darth Maul's Shadow "
        "Collective on Mandalore. The battle begins as a conventional siege but escalates into "
        "something far more personal.\n\n"
        "Ahsoka's duel with Maul in the throne room of Sundari is not just combat\u2014it's a "
        "clash of two people who both see the coming catastrophe. Maul knows Sidious's plan and "
        "desperately tries to convince Ahsoka to join him in stopping it. When she refuses, their "
        "fight becomes a masterwork of choreography and emotion.\n\n"
        "Then Order 66 strikes. The final episodes depict Ahsoka and Captain Rex fighting to "
        "survive against their own men\u2014clone troopers they led and loved, now mindlessly "
        "trying to kill them. Rex's chip-removal scene, where he resists the programming with "
        "tears streaming down his face, gasping \"Find him\u2014find Fives,\" is perhaps the "
        "most emotionally raw moment in all of Star Wars animation.\n\n"
        "**Fun Fact:** The final arc was animated in a more cinematic style with a wider aspect "
        "ratio\u2014Dave Filoni wanted it to feel like a Star Wars film."
    ),
    "content_pl": (
        "Obl\u0119\u017cenie Mandalore to arcydzie\u0142ne zako\u0144czenie Wojen Klon\u00f3w\u2014"
        "bitwa rozgrywaj\u0105ca si\u0119 jednocze\u015bnie z wydarzeniami Zemsty Sith\u00f3w, "
        "nadaj\u0105ca obu historiom druzgoc\u0105cy kontekst. Gdy Anakin upada na ciemn\u0105 "
        "stron\u0119 na Coruscant, Ahsoka walczy o przetrwanie na Mandalore.\n\n"
        "Ahsoka, oficjalnie ju\u017c nie Jedi, prowadzi dywizj\u0119 501. Legionu\u2014\u017co\u0142nierzy "
        "klon\u00f3w, kt\u00f3rzy pomalowali he\u0142my na pomara\u0144czowo na jej cze\u015b\u0107\u2014"
        "przeciwko Zbiorowemu Cieniowi Dartha Maula.\n\n"
        "Pojedynek Ahsoki z Maulem w sali tronowej Sundari to nie tylko walka\u2014to starcie "
        "dw\u00f3ch os\u00f3b, kt\u00f3re obie widz\u0105 nadchodz\u0105c\u0105 katastrof\u0119. "
        "Maul zna plan Sidiousa i desperacko pr\u00f3buje przekona\u0107 Ahsok\u0119. Gdy odmawia, "
        "ich walka staje si\u0119 mistrzowskim dzie\u0142em choreografii.\n\n"
        "Wtedy uderza Rozkaz 66. Ostatnie odcinki przedstawiaj\u0105 Ahsok\u0119 i Kapitana Rexa "
        "walcz\u0105cych o przetrwanie. Scena usuni\u0119cia chipu Rexa, gdzie opiera si\u0119 "
        "programowaniu ze \u0142zami, dysz\u0105c \u201eZnajd\u017a go\u2014znajd\u017a Fivesa\u201d, "
        "jest najbardziej emocjonalnie surowym momentem w animacji Star Wars.\n\n"
        "**Ciekawostka:** Ostatni \u0142uk fabularny animowano w szerszym formacie\u2014Dave Filoni "
        "chcia\u0142, by wygl\u0105da\u0142 jak film Star Wars."
    ),
}

full_content["darth-nihilus"] = {
    "content_en": (
        "Darth Nihilus is perhaps the most terrifying Sith Lord in Star Wars lore\u2014not because "
        "of his power or ambition, but because of what he had become. He was no longer truly a "
        "person. He was hunger incarnate, a wound in the Force that consumed all life around him "
        "to sustain its own existence.\n\n"
        "Nihilus was a survivor of the Mandalorian Wars, specifically the activation of the Mass "
        "Shadow Generator at Malachor V\u2014a superweapon that killed thousands simultaneously. "
        "The trauma, combined with exposure to the resulting wound in the Force, transformed "
        "Nihilus into something unprecedented.\n\n"
        "He developed the ability to drain the Force from living beings on a planetary scale. His "
        "consumption of Katarr\u2014a Miraluka colony world\u2014killed every living thing on the "
        "planet in an instant. Only Visas Marr survived, drawn to him as his apprentice.\n\n"
        "What makes Nihilus uniquely horrifying is that his power was also his prison. He couldn't "
        "stop consuming. His hunger grew with every world he drained, and his physical form "
        "deteriorated until he was nothing more than dark side energy held together by his robes "
        "and mask. His voice became unintelligible\u2014a distorted, ancient language only Visas "
        "could interpret.\n\n"
        "**Fun Fact:** Nihilus's mask became one of the most iconic Sith designs in Star Wars. "
        "It appears as a collectible in several games and inspired numerous fan interpretations "
        "of 'faceless evil' in the franchise."
    ),
    "content_pl": (
        "Darth Nihilus jest by\u0107 mo\u017ce najbardziej przera\u017caj\u0105cym Lordem "
        "Sith\u00f3w w historii Star Wars\u2014nie z powodu jego mocy czy ambicji, ale z powodu "
        "tego, czym si\u0119 sta\u0142. Nie by\u0142 ju\u017c naprawd\u0119 osob\u0105. By\u0142 "
        "g\u0142odem wcielonym, ran\u0105 w Mocy poch\u0142aniaj\u0105c\u0105 wszelkie \u017cycie.\n\n"
        "Nihilus by\u0142 ocalonym z Wojen Mandloria\u0144skich, konkretnie aktywacji Generatora "
        "Cienia Masowego na Malachorze V\u2014superbroni, kt\u00f3ra zabi\u0142a jednocze\u015bnie "
        "tysi\u0105ce. Trauma, po\u0142\u0105czona z ekspozycj\u0105 na ran\u0119 w Mocy, "
        "przekszta\u0142ci\u0142a Nihilusa w co\u015b bezprecedensowego.\n\n"
        "Rozwin\u0105\u0142 zdolno\u015b\u0107 wysysania Mocy z \u017cywych istot na planetarn\u0105 "
        "skal\u0119. Jego poch\u0142oni\u0119cie Katarr zabi\u0142o ka\u017cd\u0105 \u017cyw\u0105 "
        "istot\u0119 w mgnieniu oka. Tylko Visas Marr prze\u017cy\u0142a.\n\n"
        "To, co czyni Nihilusa wyj\u0105tkowo przera\u017caj\u0105cym: jego moc by\u0142a te\u017c "
        "jego wi\u0119zieniem. Nie m\u00f3g\u0142 przesta\u0107 poch\u0142ania\u0107. G\u0142\u00f3d "
        "r\u00f3s\u0142 z ka\u017cdym wyssanym \u015bwiatem, a jego fizyczna forma degradowa\u0142a "
        "si\u0119, a\u017c zosta\u0142 niczym wi\u0119cej ni\u017c energi\u0105 ciemnej strony "
        "utrzymywan\u0105 razem przez szaty i mask\u0119.\n\n"
        "**Ciekawostka:** Maska Nihilusa sta\u0142a si\u0119 jednym z najbardziej ikonicznych "
        "sitha\u0144skich design\u00f3w w Star Wars."
    ),
}

full_content["world-between-worlds"] = {
    "content_en": (
        "The World Between Worlds is one of the most profound concepts ever introduced to Star "
        "Wars canon. Discovered by Ezra Bridger beneath the Jedi Temple on Lothal, this mystical "
        "dimension exists outside normal space-time, connecting moments across history through "
        "doorways illuminated by starlight.\n\n"
        "The World manifests as an endless void filled with interconnected pathways and portals. "
        "Through these portals, one can observe\u2014and potentially alter\u2014events from any "
        "point in time. Voices of Jedi past and future echo through the space: Yoda, Obi-Wan, "
        "Qui-Gon, Ahsoka, even Rey and Kylo Ren from decades in the future.\n\n"
        "Ezra used the World Between Worlds to save Ahsoka Tano from death at the hands of Darth "
        "Vader on Malachor. By reaching through a portal into the past, he pulled her out of the "
        "collapsing Sith temple moments before Vader's killing blow\u2014proving that the World "
        "can indeed change the timeline.\n\n"
        "Emperor Palpatine desperately sought access, understanding that control over time itself "
        "would make him truly omnipotent. Ezra ultimately sealed the Lothal portal, understanding "
        "that some powers must remain beyond anyone's reach.\n\n"
        "**Fun Fact:** The concept was inspired by Dave Filoni's conversations with George Lucas "
        "about the Force, drawing on Joseph Campbell's mythological concept of the 'axis mundi'\u2014"
        "the cosmic center connecting heaven and earth."
    ),
    "content_pl": (
        "\u015awiat Mi\u0119dzy \u015awiatami to jedna z najg\u0142\u0119bszych koncepcji "
        "wprowadzonych do kanonu Star Wars. Odkryty przez Ezr\u0119 Bridgera pod \u015awi\u0105tyni\u0105 "
        "Jedi na Lothalu, ten mistyczny wymiar istnieje poza normaln\u0105 czasoprzestrzeni\u0105, "
        "\u0142\u0105cz\u0105c momenty w historii przez bramy o\u015bwietlone gwiazdami.\n\n"
        "\u015awiat manifestuje si\u0119 jako niesko\u0144czona pustka wype\u0142niona po\u0142\u0105czonymi "
        "\u015bcie\u017ckami i portalami. Przez te portale mo\u017cna obserwowa\u0107\u2014i "
        "potencjalnie zmienia\u0107\u2014wydarzenia z ka\u017cdego punktu w czasie. G\u0142osy "
        "Jedi z przesz\u0142o\u015bci i przysz\u0142o\u015bci odbijaj\u0105 si\u0119 echem.\n\n"
        "Ezra u\u017cy\u0142 \u015awiata, by uratowa\u0107 Ahsok\u0119 Tano od \u015bmierci z r\u0105k "
        "Vadera na Malachorze. Si\u0119gaj\u0105c przez portal w przesz\u0142o\u015b\u0107, "
        "wyci\u0105gn\u0105\u0142 j\u0105 z rozpadaj\u0105cej si\u0119 \u015bwi\u0105tyni.\n\n"
        "Cesarz Palpatine desperacko szuka\u0142 dost\u0119pu\u2014kontrola nad czasem to "
        "wszechmoc. Ezra ostatecznie zapieczętowa\u0142 portal, rozumiej\u0105c, \u017ce "
        "niekt\u00f3re moce musz\u0105 pozosta\u0107 poza zasi\u0119giem.\n\n"
        "**Ciekawostka:** Koncepcja zainspirowana rozmowami Filoniego z Lucasem o Mocy i "
        "mitologiczn\u0105 koncepcj\u0105 Campbella 'axis mundi'\u2014kosmicznym centrum "
        "\u0142\u0105cz\u0105cym niebo i ziemi\u0119."
    ),
}

full_content["korriban-moraband"] = {
    "content_en": (
        "Korriban\u2014later known as Moraband\u2014is the spiritual heart of the Sith Order. "
        "This desolate, red-sanded world in the Outer Rim was the homeworld of the Sith species, "
        "and for millennia served as the seat of Sith power, learning, and burial.\n\n"
        "The Valley of the Dark Lords dominates the landscape: a massive canyon lined with "
        "enormous stone tombs of ancient Sith Lords. Each tomb is a monument to power and a "
        "repository of dark side knowledge, protected by traps, spirits, and dark side energy "
        "so concentrated it drives the unprepared insane.\n\n"
        "The Sith Academy on Korriban trained generations of dark side acolytes. Aspiring Sith "
        "were sent into the tombs to prove their worth\u2014retrieving artifacts, surviving the "
        "dark side spirits within, and demonstrating the ruthlessness required to wield power. "
        "Many entered. Few emerged.\n\n"
        "The planet's connection to the dark side is so strong that it warps reality. Visitors "
        "experience visions, hear voices of dead Sith, and feel the crushing weight of accumulated "
        "centuries of hatred. Even Yoda, when he visited Moraband during the Clone Wars, faced "
        "terrifying illusions conjured by the dark side.\n\n"
        "**Fun Fact:** Called 'Korriban' in Legends material (including KOTOR), George Lucas "
        "renamed it 'Moraband' for The Clone Wars. Both names are now considered canon."
    ),
    "content_pl": (
        "Korriban\u2014p\u00f3\u017aniej znany jako Moraband\u2014to duchowe serce Zakonu "
        "Sith\u00f3w. Ten pustynny, czerwonopiastkowy \u015bwiat na Zewn\u0119trznym Kraw\u0119dzi "
        "by\u0142 ojczyzn\u0105 gatunku Sith\u00f3w i przez tysi\u0105clecia siedzib\u0105 "
        "sitha\u0144skiej w\u0142adzy, nauki i poch\u00f3wku.\n\n"
        "Dolina Mrocznych Lord\u00f3w dominuje krajobraz: masywny kanion wy\u0142o\u017cony "
        "ogromnymi kamiennymi grobowcami starożytnych Lord\u00f3w. Ka\u017cdy grobowiec jest "
        "monumentem mocy chronionym pu\u0142apkami, duchami i energi\u0105 ciemnej strony tak "
        "skoncentrowan\u0105, \u017ce doprowadza nieprzygotowanych do szale\u0144stwa.\n\n"
        "Akademia Sith\u00f3w na Korribanie szkoli\u0142a pokolenia adept\u00f3w ciemnej strony. "
        "Aspiruj\u0105cy Sithowie byli wysy\u0142ani do grobovc\u00f3w\u2014wielu wchodzi\u0142o, "
        "niewielu wychodzi\u0142o.\n\n"
        "Po\u0142\u0105czenie planety z ciemn\u0105 stron\u0105 jest tak silne, \u017ce zakrzywia "
        "rzeczywisto\u015b\u0107. Nawet Yoda, gdy odwiedzi\u0142 Moraband, stan\u0105\u0142 przed "
        "przera\u017caj\u0105cymi iluzjami.\n\n"
        "**Ciekawostka:** Nazywany 'Korriban' w Legends/KOTOR, Lucas przemianowa\u0142 na "
        "'Moraband'. Obie nazwy s\u0105 kanonem."
    ),
}

full_content["star-forge"] = {
    "content_en": (
        "The Star Forge was the ultimate weapon of the ancient Rakatan Infinite Empire\u2014a "
        "colossal space station that drew power from a nearby star and the dark side of the Force "
        "to manufacture an endless supply of warships, battle droids, and war material. It was "
        "the pinnacle of dark side technology.\n\n"
        "Built over 25,000 years before the Battle of Yavin, the Star Forge was the engine behind "
        "the Rakatans' galactic conquest. It didn't just build ships\u2014it fed on the dark side "
        "energy of its operators, amplifying their corruption while growing more powerful. The "
        "station was essentially alive, a dark side nexus that consumed its users.\n\n"
        "When the Rakatan Infinite Empire collapsed, the Star Forge was lost. It orbited a "
        "forgotten star, protected by a disruptor field, waiting to be found again.\n\n"
        "Revan rediscovered it following a trail of Star Maps scattered across the galaxy. As a "
        "Sith Lord, he built a massive fleet. Later, redeemed and memory-wiped, Revan returned "
        "to destroy the station, understanding that the Star Forge would corrupt anyone who "
        "wielded it.\n\n"
        "**Fun Fact:** The Star Forge's design was partially inspired by a Dyson sphere concept\u2014"
        "a megastructure that completely encompasses a star to harvest its energy output."
    ),
    "content_pl": (
        "Gwiezdna Ku\u017ania by\u0142a ostateczn\u0105 broni\u0105 staro\u017cytnego "
        "Niesko\u0144czonego Imperium Rakatan\u00f3w\u2014kolosaln\u0105 stacj\u0105 kosmiczn\u0105 "
        "czerpi\u0105c\u0105 moc z pobliskiej gwiazdy i ciemnej strony Mocy do wytwarzania "
        "niesko\u0144czonych zapas\u00f3w okr\u0119t\u00f3w wojennych. Szczytem technologii ciemnej strony.\n\n"
        "Zbudowana ponad 25 000 lat przed Bitw\u0105 o Yavin, nie tylko budowa\u0142a statki\u2014"
        "karmi\u0142a si\u0119 energi\u0105 ciemnej strony operator\u00f3w, wzmacniaj\u0105c "
        "ich korupcj\u0119. Stacja by\u0142a w zasadzie \u017cywa.\n\n"
        "Gdy Imperium Rakatan\u00f3w upad\u0142o, Ku\u017ania zosta\u0142a utracona. Orbitowa\u0142a "
        "wok\u00f3\u0142 zapomnianej gwiazdy, chroniona polem zak\u0142\u00f3caj\u0105cym.\n\n"
        "Revan j\u0105 odkry\u0142, u\u017cywa\u0142 jako Sith, potem zniszczy\u0142 odkupiony, "
        "rozumiej\u0105c \u017ce Ku\u017ania skorumpuje ka\u017cdego.\n\n"
        "**Ciekawostka:** Design inspirowany sfer\u0105 Dysona\u2014megastruktur\u0105 otaczaj\u0105c\u0105 "
        "gwiazd\u0119, by pozyska\u0107 energi\u0119."
    ),
}

full_content["battle-of-malachor"] = {
    "content_en": (
        "The Battle of Malachor is one of the most catastrophic events in galactic history\u2014a "
        "conflict so devastating that it scarred both the planet and the Force itself. Two versions "
        "exist in Star Wars lore, both carrying immense weight.\n\n"
        "In the ancient past, a massive battle between the Jedi and the Sith took place on "
        "Malachor. A superweapon within the Sith temple was activated during the fighting, "
        "instantly petrifying every combatant on the battlefield. Thousands of years later, "
        "Ahsoka, Kanan, and Ezra found the battlefield frozen\u2014Jedi and Sith locked in "
        "combat for eternity, lightsabers still clutched in stone hands.\n\n"
        "During the Mandalorian Wars, Malachor V became the site of another apocalyptic battle. "
        "The Jedi General known as the Exile activated the Mass Shadow Generator, a gravity-based "
        "superweapon that crushed both the Mandalorian fleet and the Republic's own forces. The "
        "screams through the Force created a wound so deep it produced Darth Nihilus.\n\n"
        "Malachor represents the ultimate consequence of unchecked warfare. Both battles demonstrate "
        "that pursuing victory at any cost leads to devastation echoing through millennia.\n\n"
        "**Fun Fact:** The petrified battlefield scene in Rebels was inspired by the ruins of "
        "Pompeii, where volcanic ash preserved the final moments of an ancient civilization."
    ),
    "content_pl": (
        "Bitwa o Malachor to jedno z najbardziej katastroficznych wydarze\u0144 w galaktycznej "
        "historii\u2014konflikt tak druzgoc\u0105cy, \u017ce zostawi\u0142 blizn\u0119 zar\u00f3wno "
        "na planecie, jak i na samej Mocy.\n\n"
        "W staro\u017cytnej przesz\u0142o\u015bci masowa bitwa mi\u0119dzy Jedi a Sithami mia\u0142a "
        "miejsce na Malachorze. Superbro\u0144 wewn\u0105trz \u015bwi\u0105tyni Sith\u00f3w "
        "zosta\u0142a aktywowana, natychmiast petryfikuj\u0105c ka\u017cdego kombatanta. Tysi\u0105ce "
        "lat p\u00f3\u017aniej Ahsoka, Kanan i Ezra znale\u017ali pole bitwy zamro\u017cone\u2014"
        "Jedi i Sithowie zamkni\u0119ci w walce na wieczno\u015b\u0107, miecze w kamiennych d\u0142oniach.\n\n"
        "Podczas Wojen Mandloria\u0144skich Malachor V by\u0142 miejscem kolejnej apokaliptycznej "
        "bitwy. Generator Cienia Masowego zmia\u017cd\u017cy\u0142 floty, tworz\u0105c ran\u0119 "
        "w Mocy rodz\u0105c\u0105 Dartha Nihilusa.\n\n"
        "Malachor reprezentuje ostateczn\u0105 konsekwencj\u0119 niekontrolowanej wojny.\n\n"
        "**Ciekawostka:** Scena skamienia\u0142ego pola bitwy w Rebels zainspirowana ruinami "
        "Pompej\u00f3w."
    ),
}

# Apply updates
for slug, content in full_content.items():
    for p in posts:
        if p['slug'] == slug:
            p['content_en'] = content['content_en']
            p['content_pl'] = content['content_pl']
            en_len = len(content['content_en'])
            pl_len = len(content['content_pl'])
            print(f"Updated {slug:30s} EN:{en_len:5d} PL:{pl_len:5d}")

# Also update existing posts with image_url
for p in posts:
    if not p.get('image_url'):
        p['image_url'] = f"/images/posts/{p['slug']}.webp"

with open(POSTS_FILE, 'w') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"\nDone. Total posts: {len(posts)}")
