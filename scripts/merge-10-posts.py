#!/usr/bin/env python3
import json
import os

POSTS_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'posts.json')

with open(POSTS_FILE) as f:
    posts = json.load(f)

existing_slugs = {p['slug'] for p in posts}

new_posts_data = [
    ("ahsoka-tano", "Ahsoka Tano: Walking Between Light and Shadow", "Ahsoka Tano: Kroczenie Między Światłem a Cieniem",
     "Neither Jedi nor Sith—Ahsoka forged her own path through the Force after surviving Order 66.",
     "Ani Jedi, ani Sith—Ahsoka wytyczała własną ścieżkę przez Moc po przetrwaniu Rozkazu 66.",
     "Ahsoka Tano began as Anakin Skywalker's Padawan during the Clone Wars and evolved into one of the most compelling figures in Star Wars. During the wars, she proved herself an exceptional commander. But her defining moment came when the Jedi Council wrongly accused her of terrorism. Though cleared, the experience shattered her faith. After Order 66, Ahsoka became the covert operative 'Fulcrum' for the Rebel Alliance. Her white lightsabers symbolize her unique position: wielding the Force without allegiance to Jedi or Sith.",
     "Ahsoka Tano zaczynała jako Padawan Anakina w Wojnach Klonów i wyrosła na jedną z najważniejszych postaci Star Wars. Podczas wojen była wyjątkową dowódczynią. Ale definiujący moment nadszedł, gdy Rada Jedi oskarżyła ją o terroryzm. Choć oczyszczona, doświadczenie zniszczyło jej wiarę. Po Rozkazie 66 stała się agentką 'Fulcrum'. Białe miecze symbolizują jej pozycję: Moc bez Jedi czy Sithów.",
     "character", "clone_wars", "canon", True),

    ("grand-admiral-thrawn", "Grand Admiral Thrawn: The Art of War", "Wielki Admirał Thrawn: Sztuka Wojny",
     "The only alien to reach the Empire's highest rank—Thrawn studied art to understand his enemies.",
     "Jedyny obcy w najwyższej randze Imperium—Thrawn studiował sztukę, by zrozumieć wrogów.",
     "Grand Admiral Thrawn is the Empire's most brilliant strategist. In a human-supremacist Empire, a blue-skinned Chiss with glowing red eyes rose to the highest rank through tactical genius. Thrawn's method: cultural analysis through art. He studies paintings and music to understand psychology and predict tactics. Where others used firepower, Thrawn used precision strikes. Created by Timothy Zahn in 1991, Thrawn essentially created the Expanded Universe.",
     "Wielki Admirał Thrawn to najgenialniejszy strateg Imperium. W rasistowskim Imperium, niebieskoskóry Chiss wzniósł się na szczyt dzięki geniuszowi taktycznemu. Metoda Thrawna: analiza przez sztukę. Studiuje malarstwo i muzykę, by zrozumieć psychologię i przewidywać taktykę. Stworzony przez Timothy'ego Zahna w 1991, Thrawn stworzył Expanded Universe.",
     "character", "imperial", "canon", True),

    ("order-66", "Order 66: The Fall of the Jedi", "Rozkaz 66: Upadek Jedi",
     "Clone soldiers turned their weapons on their Jedi generals—and the galaxy changed forever.",
     "Żołnierze klony odwrócili broń przeciw generałom Jedi—i galaktyka zmieniła się na zawsze.",
     "Order 66 was the most devastating betrayal in history. Palpatine activated biochips in every clone, compelling them to kill their Jedi commanders. The horror was in the intimacy. Jedi and clones fought together for three years. Commander Cody tried to kill Obi-Wan without pause. Ki-Adi-Mundi fell on Mygeeto, Aayla Secura shot on Felucia. The chip concept was added by The Clone Wars series, adding moral complexity by showing it wasn't their choice.",
     "Rozkaz 66 był najbardziej druzgocącą zdradą w historii. Palpatine aktywował biochipy, zmuszając klony do zabicia dowódców Jedi. Groza tkwiła w intymności. Jedi i klony walczyli razem przez trzy lata. Cody próbował zabić Obi-Wana. Ki-Adi-Mundi padł na Mygeeto, Aayla zastrzelona na Felucii. Koncepcja chipów dodana przez Wojny Klonów, pokazując że to nie był ich wybór.",
     "scene", "clone_wars", "canon", True),

    ("ebon-hawk", "The Ebon Hawk: Old Republic's Millennium Falcon", "Ebon Hawk: Sokół Millennium Starej Republiki",
     "Thousands of years before the Falcon, another legendary freighter carried heroes across the galaxy.",
     "Tysiące lat przed Sokołem, inny legendarny frachtowiec wiózł bohaterów przez galaktykę.",
     "The Ebon Hawk is the Falcon's spiritual ancestor—fast, tough, perpetually broken. During the Jedi Civil War, it served as Revan's base. What makes the Hawk special: the conversations aboard. Jedi, Sith, soldiers, droids debating philosophy and the Force. Designed to evoke the Falcon in KOTOR, giving players that home base feeling.",
     "Ebon Hawk to duchowy przodek Falcona—szybki, wytrzymały, ciągle zepsuty. Podczas Jediańskiej Wojny Domowej służył Revanowi. To, co czyni Hawka wyjątkowym: rozmowy na pokładzie. Jedi, Sithowie, żołnierze debatujący o Mocy. Zaprojektowany by przypominać Falcona w KOTOR.",
     "ship", "old_republic", "legends", False),

    ("siege-of-mandalore", "Siege of Mandalore: Final Clone Wars Battle", "Oblężenie Mandalore: Ostatnia Bitwa Wojen Klonów",
     "As the Republic crumbled and Order 66 struck, Ahsoka faced Darth Maul bridging Clone Wars and Revenge of the Sith.",
     "Gdy Republika się rozpadała i uderzył Rozkaz 66, Ahsoka stanęła naprzeciw Maula.",
     "The Siege of Mandalore unfolds simultaneously with Revenge of the Sith. While Anakin falls on Coruscant, Ahsoka leads the 501st against Maul on Mandalore. Ahsoka's duel with Maul is personal—both see the catastrophe coming. Then Order 66 strikes. Ahsoka and Rex fight to survive against their own men. The final arc was animated in wider aspect ratio to feel like a Star Wars film.",
     "Oblężenie Mandalore dzieje się jednocześnie z Zemstą Sithów. Gdy Anakin upada na Coruscant, Ahsoka prowadzi 501. przeciwko Maulowi. Pojedynek jest osobisty—oboje widzą katastrofę. Potem uderza Rozkaz 66. Ahsoka i Rex walczą o przetrwanie.",
     "battle", "clone_wars", "canon", False),

    ("darth-nihilus", "Darth Nihilus: The Lord of Hunger", "Darth Nihilus: Pan Głodu",
     "A wound in the Force—Nihilus consumed entire planets to feed an insatiable hunger.",
     "Rana w Mocy—Nihilus pochłaniał planety, by nakarmić nienasyconą żądzę.",
     "Darth Nihilus is the most terrifying Sith—not a person, but hunger incarnate. A survivor of Malachor V's Mass Shadow Generator, trauma transformed him. He drained the Force from planets. Katarr died instantly. His power was his prison—he couldn't stop, his form deteriorated to dark side energy held by robes. Nihilus's mask became one of the most iconic Sith designs.",
     "Darth Nihilus to najstraszniejszy Sith—nie osoba, ale głód wcielony. Ocalały z Malachoru V, trauma go przekształciła. Wysysał Moc z planet. Katarr zginął natychmiast. Jego moc była więzieniem—nie mógł przestać, forma zdegradowała do energii w szatach.",
     "character", "old_republic", "legends", False),

    ("world-between-worlds", "World Between Worlds: Beyond Time", "Świat Między Światami: Poza Czasem",
     "A mystical plane connecting all moments through the Force—where past, present, and future exist simultaneously.",
     "Mistyczna płaszczyzna łącząca momenty przez Moc—gdzie przeszłość, teraźniejszość i przyszłość istnieją jednocześnie.",
     "Discovered by Ezra beneath Lothal's Jedi Temple, this dimension exists outside space-time. Portals connect moments across history. Ezra used it to save Ahsoka from Vader on Malachor, pulling her through time. Palpatine desperately sought it—control over time means omnipotence. Inspired by Filoni-Lucas conversations about the Force and Campbell's axis mundi concept.",
     "Odkryty przez Ezrę pod Świątynią Jedi na Lothalu, ten wymiar istnieje poza czasoprzestrzenią. Portale łączą momenty w historii. Ezra użył go, by uratować Ahsokę przed Vaderem. Palpatine desperacko go szukał—kontrola czasu to wszechmoc.",
     "lore", "rebellion", "canon", False),

    ("korriban-moraband", "Korriban: Valley of the Dark Lords", "Korriban: Dolina Mrocznych Lordów",
     "The ancient Sith homeworld—a desolate world of tombs, temples, and terrible power.",
     "Starożytna ojczyzna Sithów—pustynny świat grobowców, świątyń i straszliwej mocy.",
     "Korriban (later Moraband) is the Sith spiritual heart. This red-sanded Outer Rim world was the Sith species homeworld and seat of power for millennia. The Valley of Dark Lords: a canyon lined with tombs of ancient Sith Lords, protected by traps and spirits. The Academy trained generations. Called Korriban in Legends/KOTOR, George Lucas renamed it Moraband for Clone Wars. Both names are canon.",
     "Korriban (później Moraband) to duchowe serce Sithów. Ten czerwonopiastkowy świat na Zewnętrznym Krawędzi był ojczyzną Sithów. Dolina Mrocznych Lordów: kanion z grobowcami starożytnych Lordów Sithów. Akademia szkoliła pokolenia.",
     "planet", "old_republic", "canon", False),

    ("star-forge", "Star Forge: Engine of Infinite War", "Gwiezdna Kuźnia: Machina Nieskończonej Wojny",
     "Ancient Rakatan station powered by dark side and a star's core—producing an endless fleet.",
     "Starożytna stacja Rakatanów zasilana ciemną stroną i jądrem gwiazdy—produkująca nieskończoną flotę.",
     "The Star Forge was the Rakatan Infinite Empire's ultimate weapon—drawing power from a star and dark side to manufacture endless warships. Essentially alive, a dark side nexus. Revan rediscovered it, used it as a Sith Lord, then destroyed it redeemed, understanding it corrupts anyone who wields it. Design inspired by Dyson sphere—a megastructure encompassing a star to harvest energy.",
     "Gwiezdna Kuźnia była ostateczną bronią Nieskończonego Imperium Rakatanów—czerpiąc moc z gwiazdy i ciemnej strony do wytwarzania okrętów. W zasadzie żywa, nexus ciemnej strony. Revan ją odkrył, używał jako Sith, potem zniszczył odkupiony.",
     "timeline", "old_republic", "legends", False),

    ("battle-of-malachor", "Battle of Malachor: Ancient Cataclysm", "Bitwa o Malachor: Starożytny Kataklizm",
     "A Jedi-Sith clash that turned a world into a petrified graveyard—creating a deadly wound in the Force.",
     "Starcie Jedi-Sithów zamieniające świat w skamieniony cmentarz—tworząc ranę w Mocy.",
     "The Battle of Malachor scarred the planet and Force. An ancient battle activated a Sith temple weapon, petrifying every combatant—Jedi and Sith frozen in combat for eternity. During Mandalorian Wars, Malachor V saw the Mass Shadow Generator crush fleets, creating a Force wound that spawned Darth Nihilus. The petrified battlefield in Rebels was inspired by Pompeii ruins.",
     "Bitwa o Malachor zostawiła bliznę na planecie i Mocy. Starożytna bitwa aktywowała broń świątyni Sithów, petryfikując wszystkich. Podczas Wojen Mandloriańskich Generator Cienia Masowego zmiażdżył floty, tworząc ranę w Mocy rodząc Nihilusa.",
     "timeline", "old_republic", "canon", False),
]

added = 0
for data in new_posts_data:
    slug = data[0]
    if slug not in existing_slugs:
        posts.append({
            "slug": slug,
            "title_en": data[1],
            "title_pl": data[2],
            "excerpt_en": data[3],
            "excerpt_pl": data[4],
            "content_en": data[5],
            "content_pl": data[6],
            "category": data[7],
            "era": data[8],
            "canon_status": data[9],
            "featured": data[10],
            "image_url": f"/images/posts/{slug}.webp"
        })
        added += 1
        print(f"+ {slug}")

with open(POSTS_FILE, 'w') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"\n✓ Added {added} posts. Total: {len(posts)}")
