<template>
  <div v-if="db">
    <div class="filters--tabs">
      <ul class="nav nav-fill justify-content-center py-2 mb-4 mb-sm-0">
        <li v-for="(filter, key) in available" :key="key" class="nav-item">
          <a
            data-toggle="tab"
            :href="'#filter-' + key"
            class="nav-link"
            :class="{ active: show == key }"
            @click="show = key"
            >{{ filter.name }}</a
          >
        </li>
      </ul>
    </div>
    <div class="filters--tabs-content tab-content px-sm-4">
      <div
        v-for="(filter, key) in available"
        :key="key"
        :id="'filter-' + key"
        class="tab-pane"
        :class="{ active: show == key }"
      >
        <div class="row">
          <div
            v-for="option in filter.options"
            :key="option.name"
            class="col-6 col-md-4 col-lg-3 col-xl-2 mb-3 my-sm-3"
          >
            <a
              href="#"
              @click.prevent="setFilter(filter.name, option.name)"
              class="d-block"
              :class="{
                'border-success': selected[filter.name] == option.name
              }"
            >
              <div class="card pt-1">
                <img
                  v-if="option.image"
                  :src="option.image"
                  class="card-img-top"
                  :alt="option.name"
                />
                <img
                  v-else
                  :src="dimage"
                  class="card-img-top"
                  :alt="option.name"
                />
                <div class="card-body">
                  <h5 class="card-title text-center">
                    <small>{{ option.name }}</small>
                  </h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="withFilters" class="filters--enable py-2 px-sm-4">
      <strong>Filters:</strong>
      <span
        v-for="(value, filter) in selected"
        :key="filter"
        class="badge badge-pill badge-primary m-2 py-2 px-3"
      >
        <strong>{{ filter }}:</strong>
        {{ value }}
        <a href="#" @click.prevent="setFilter(filter, false)">
          <i class="material-icons small">clear</i>
        </a>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "filters",
  props: ["db"],
  watch: {
    db() {
      this.setup();
    }
  },
  data() {
    let filters = {};
    let images = {};

    filters["glasses"] = [
      {
        name: "COLLECTION",
        options: [
          {
            name: "HOSPITALITY GLASS",
            image: require("../assets/HospitalityGlass.jpg")
          },
          { name: "NUDE", image: require("../assets/NUDEbanner.jpg") }
        ]
      },
      {
        name: "MATERIAL",
        options: [
          {
            name: "ULTRA CLEAR CRYSTAL",
            image: require("../assets/UltraClear.jpg")
          },
          {
            name: "PREMIUM GLASS",
            image: require("../assets/PremiumGlass.jpg")
          }
        ]
      },
      {
        name: "STEMMED",
        options: [
          { name: "RED WINE", image: require("../assets/RedWineGlass.jpg") },
          {
            name: "WHITE WINE",
            image: require("../assets/WhiteWineGlass.jpg")
          },
          { name: "CHAMPAGNE", image: require("../assets/ChampagneGlass.jpg") },
          { name: "MARTINI", image: require("../assets/MartiniGlass.jpg") },
          { name: "COUPE", image: require("../assets/CoupeGlass.jpg") },
          {
            name: "COCKTAIL",
            image: require("../assets/StemmedCocktailGlass.jpg")
          },
          {
            name: "ALL PURPOSE",
            image: require("../assets/AllPurposeGlass.jpg")
          },
          { name: "COGNAC", image: require("../assets/CognacGlass.jpg") },
          { name: "BEER", image: require("../assets/StemmedBeerGlass.jpg") }
        ]
      },
      {
        name: "TUMBLERS",
        options: [
          { name: "HI BALL", image: require("../assets/HiBallGlass.jpg") },
          { name: "COOLER", image: require("../assets/CoolerGlass.jpg") },
          {
            name: "DOUBLE OLD FASHIONED",
            image: require("../assets/TumblersDoubleOldFashioned.jpg")
          },
          {
            name: "OLD FASHIONED",
            image: require("../assets/DoubleOldFashioned.jpg")
          },
          { name: "ROCKS", image: require("../assets/RocksGlass.jpg") },
          { name: "NEAT", image: require("../assets/TumblersNeat.jpg") },
          { name: "SHOT", image: require("../assets/TumblersShot.jpg") },
          {
            name: "DOUBLE WALLED",
            image: require("../assets/DoubleWalledTumblers.jpg")
          },
          { name: "TUMBLERS", image: require("../assets/TumblersShot.jpg") }
        ]
      },
      {
        name: "BEER",
        options: [
          { name: "BEER", image: require("../assets/StemmedBeerGlass.jpg") },
          { name: "CRAFT", image: require("../assets/CraftBeer.jpg") },
          { name: "PILSNER", image: require("../assets/PilsnerBeers.jpg") },
          { name: "MUG", image: require("../assets/MugBeers.jpg") },
          { name: "TASTER", image: require("../assets/TasterBeer.jpg") }
        ]
      },
      {
        name: "RECYCLED GLASS",
        options: [
          { name: "RECYCLED GLASS", image: require("../assets/Skull.jpg") },
          { name: "HI BALL", image: require("../assets/RecycledTumbler.jpg") },
          { name: "TUMBLERS", image: require("../assets/RecycledTumbler.jpg") },
          {
            name: "BITTERS BOTTLE",
            image: require("../assets/BittersBottle.jpg")
          }
        ]
      },
      {
        name: "DRINKS",
        options: [
          { name: "WINE", image: require("../assets/Wine.jpg") },
          { name: "COCKTAIL", image: require("../assets/cocktail.jpg") },
          { name: "WHISKEY", image: require("../assets/whiskey.jpg") },
          { name: "WATER", image: require("../assets/Water.jpg") },
          { name: "COFFEE", image: require("../assets/Coffee.jpg") },
          { name: "TEQUILA", image: require("../assets/Tequil.jpg") },
          { name: "MEZCAL", image: require("../assets/Mezcal.jpg") }
        ]
      },
      {
        name: "ACCESSORIES",
        options: [
          { name: "DECANTER", image: require("../assets/Decanter.jpg") },
          { name: "CARAFE", image: require("../assets/Carafe.jpg") },
          { name: "PITCHER", image: require("../assets/Pitchers.jpg") },
          { name: "ICE BUCKET", image: require("../assets/IceBucket.jpg") },
          { name: "JARS", image: require("../assets/Jars.jpg") },
          { name: "CHEF BOWLS", image: require("../assets/ChefsBowls.jpg") },
          { name: "DESSERTS", image: require("../assets/Desserts.jpg") },
          { name: "GLASS CLOCHE", image: require("../assets/GlassCloche.jpg") },
          {
            name: "INFUSION JARS",
            image: require("../assets/InfusionJars.jpg")
          },
          {
            name: "MIXING BEAKERS",
            image: require("../assets/MixingBeaker.jpg")
          },
          { name: "PATISSERIE", image: require("../assets/Patisserie.jpg") },
          {
            name: "TABLETOP ACCESSORIES",
            image: require("../assets/TabletopAccessories.jpg")
          },
          { name: "TIKI", image: require("../assets/Tiki.jpg") },
          { name: "BOTTLES", image: require("../assets/Bottle.jpg") },
          { name: "VOTIVES", image: require("../assets/Votives.jpg") }
        ]
      }
    ];

    images["tablewares"] = require("../assets/filter-tableware.jpg");

    filters["tablewares"] = [
      {
        name: "Materals",
        options: [
          {
            name: "VITRIFIED PORCELAIN",
            image: require("../assets/porcelain.jpg")
          },
          {
            name: "SUPERIOR TERRACOTTA",
            image: require("../assets/Terracotta.jpg")
          },
          {
            name: "SUPERIOR STONEWARE",
            image: require("../assets/Stoneware.jpg")
          },
          { name: "WOOD", image: require("../assets/wood.jpg") },
          { name: "COPPER", image: require("../assets/coppertable.jpg") },
          { name: "METAL", image: require("../assets/Metal.jpg") },
          { name: "MELAMINE", image: require("../assets/Melamine.jpg") }
        ]
      },
      {
        name: "Shapes",
        options: [
          { name: "ROUND", image: require("../assets/Round.jpg") },
          { name: "OVAL", image: require("../assets/Oval.jpg") },
          { name: "RECTANGLE", image: require("../assets/REctangle.jpg") },
          { name: "UNIQUE", image: require("../assets/Unique.jpg") }
        ]
      },
      {
        name: "Types",
        options: [
          { name: "PLATE", image: require("../assets/Plate.jpg") },
          { name: "BOWL", image: require("../assets/Bowl.jpg") },
          { name: "PLATTER", image: require("../assets/Platter.jpg") },
          { name: "BOARD", image: require("../assets/Board.jpg") },
          { name: "STAND", image: require("../assets/Stand.jpg") },
          { name: "CRATE", image: require("../assets/Crate.jpg") },
          { name: "DISH", image: require("../assets/Dish.jpg") },
          { name: "KNIFE", image: require("../assets/Knife.jpg") },
          { name: "MUG", image: require("../assets/MUG.jpg") },
          { name: "RAMEKIN", image: require("../assets/Ramekin.jpg") },
          { name: "Saucer", image: require("../assets/Saucer.jpg") }
        ]
      },
      {
        name: "Diameter",
        options: [
          { name: "0-5", image: require("../assets/0-5_.jpg") },
          { name: "5-10", image: require("../assets/5-10_.jpg") },
          { name: "10-15", image: require("../assets/10-15.jpg") },
          { name: "15-20", image: require("../assets/15-20.jpg") },
          { name: "20-25", image: require("../assets/20-25.jpg") },
          { name: "25+", image: require("../assets/25+.jpg") }
        ]
      }
    ];

    // images["tablewares"] = require("../assets/filter-tableware.jpg");

    filters["unbreakables"] = [
      {
        name: "COLLECTIONS",
        options: [
          { name: "SUPERGLAS", image: require("../assets/Superglas.jpg") },
          { name: "STRAHL", image: require("../assets/STRAHL.jpg") },
          {
            name: "HG PREMIUM POLYCARBONATE",
            image: require("../assets/UltraClear.jpg")
          }
        ]
      },
      {
        name: "STEMMED",
        options: [
          { name: "RED WINE", image: require("../assets/RedWineunbreak.jpg") },
          {
            name: "WHITE WINE",
            image: require("../assets/WhiteWineunbreak.jpg")
          },
          {
            name: "CHAMPAGNE",
            image: require("../assets/Champagneunbreak.jpg")
          },
          { name: "MARTINI", image: require("../assets/Martiniunbreak.jpg") },
          { name: "COUPE", image: require("../assets/Coupeunbreak.jpg") },
          { name: "COCKTAIL", image: require("../assets/Cocktailunbreak.jpg") },
          {
            name: "All PURPOSE",
            image: require("../assets/AllPurposeUnbreak.jpg")
          },
          { name: "G & T", image: require("../assets/GinTonicunbreak.jpg") },
          { name: "BEER", image: require("../assets/CraftBeerunbreak.jpg") }
        ]
      },
      {
        name: "TUMBLERS",
        options: [
          { name: "HI BALL", image: require("../assets/HiBallunbreak.jpg") },
          { name: "COOLER", image: require("../assets/Coolerunbreakable.jpg") },
          {
            name: "DOUBLE OLD FASHIONED",
            image: require("../assets/oldfashtumbler.jpg")
          },
          {
            name: "OLD FASHIONED",
            image: require("../assets/fashionedunbreak.jpg")
          },
          { name: "ROCKS", image: require("../assets/Rocksunbreak.jpg") },
          { name: "NEAT", image: require("../assets/Neatunbreak.jpg") },
          { name: "SHOT", image: require("../assets/Shotunbreak.jpg") }
        ]
      },
      {
        name: "BEER",
        options: [
          { name: "CRAFT", image: require("../assets/CraftBeers.jpg") },
          { name: "PILSNER", image: require("../assets/Pilsnerbeer.jpg") },
          { name: "MUG", image: require("../assets/Mugbeer.jpg") },
          { name: "PINT", image: require("../assets/Pintbeer.jpg") }
        ]
      },
      {
        name: "ACCESSORIES",
        options: [
          { name: "DECANTER", image: require("../assets/Wine.jpg") },
          { name: "CARAFE", image: require("../assets/Carafeun.jpg") },
          { name: "PITCHER", image: require("../assets/Pitcherun.jpg") },
          { name: "ICE BUCKET", image: require("../assets/IceBucketun.jpg") },
          { name: "BOTTLES", image: require("../assets/Bottlesun.jpg") }
        ]
      }
    ];

    // images["unbreakables"] = require("../assets/home2.jpg");

    filters["barwares"] = [
      {
        name: "POURERS",
        options: [
          { name: "PROFLOW", image: require("../assets/ProFlow.jpg") },
          { name: "BARFLOW", image: require("../assets/BarFlow.jpg") },
          {
            name: "TRADITIONAL POURERS",
            image: require("../assets/TraditionalPourers.jpg")
          },
          {
            name: "POURERS ACCESSORIES",
            image: require("../assets/PourerAccessories.jpg")
          }
        ]
      },
      {
        name: "MATERIAL",
        options: [
          { name: "METAL", image: require("../assets/MetalBarware.jpg") },
          { name: "PLASTIC", image: require("../assets/PlasticBarware.jpg") },
          { name: "WOOD", image: require("../assets/Woodbarware.jpg") },
          { name: "PAPER", image: require("../assets/Paperbarware.jpg") },
          { name: "GLASS", image: require("../assets/Glassbarware.jpg") }
        ]
      },
      {
        name: "TOOLS",
        options: [
          { name: "SHAKER", image: require("../assets/Shakers.jpg") },
          { name: "JIGGER", image: require("../assets/Jiggers.jpg") },
          {
            name: "SPOONS SWIZZLERS",
            image: require("../assets/SpoonsSwizzlers.jpg")
          },
          {
            name: "STRAINER",
            image: require("../assets/StrainersBarware.jpg")
          },
          {
            name: "BAR TOOLS ACCESSORIES",
            image: require("../assets/BartoolsAccessories.jpg")
          },
          { name: "STIRRERS", image: require("../assets/Stirrers.jpg") },
          { name: "STRAWS", image: require("../assets/Straws.jpg") },
          { name: "DRINKWARE", image: require("../assets/drinkwaren.jpg") },
          {
            name: "MUGS TANKARDS",
            image: require("../assets/MugsTankards.jpg")
          },
          {
            name: "COCKTAIL PICKS",
            image: require("../assets/CocktailPics.jpg")
          },
          { name: "MUDDLER", image: require("../assets/Muddlers.jpg") },
          { name: "TWEEZERS", image: require("../assets/Tweezers.jpg") },
          {
            name: "BITTERS BOTTLES",
            image: require("../assets/BittersBottle.jpg")
          }
        ]
      },
      {
        name: "COLORS",
        options: [
          { name: "GOLD", image: require("../assets/Gold.jpg") },
          { name: "COPPER", image: require("../assets/Copper.jpg") },
          { name: "SILVER", image: require("../assets/SILVER.jpg") },
          { name: "GUNMETAL", image: require("../assets/GunMetal.jpg") },
          { name: "BLACK", image: require("../assets/BLACK.jpg") }
        ]
      },
      {
        name: "BAR KITS",
        options: [
          {
            name: "TRAVEL ROLLS",
            image: require("../assets/TravelRolls.jpg")
          },
          { name: "BAR KITS", image: require("../assets/BarKits.jpg") }
        ]
      }
    ];

    images["barwares"] = require("../assets/home2.jpg");

    return {
      filters: filters,
      images: images,
      selected: {},
      show: 0
    };
  },
  computed: {
    available() {
      return this.filters[this.db];
    },
    dimage() {
      return this.images[this.db];
    },
    withFilters() {
      for (var item in this.selected) {
        return true;
      }
      return false;
    }
  },
  methods: {
    setup() {
      this.show = 0;
      this.selected = {};
    },
    setFilter(filter, value) {
      if (value) {
        this.$set(this.selected, filter, value);
      } else {
        var nobject = Object.assign({}, this.selected);
        delete nobject[filter];
        this.selected = nobject;
      }

      this.$emit("updatefilter", this.selected);
    }
  },
  mounted() {
    this.setup();
  }
};
</script>
