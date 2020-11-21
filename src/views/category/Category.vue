<template>
  <div class="wrapper">
    <ul class="content">
      <li>Fenleileix1</li>
      <li>Fenleileix2</li>
      <li>Fenleileix3</li>
      <li>Fenleileix4</li>
      <li>Fenleileix5</li>
      <li>Fenleileix6</li>
      <li>Fenleileix7</li>
      <li>Fenleileix8</li>
      <li>Fenleileix9</li>
      <li>Fenleileix10</li>
      <li>Fenleileix11</li>
      <li>Fenleileix12</li>
      <li>Fenleileix13</li>
      <li>Fenleileix14</li>
      <li>Fenleileix15</li>
      <li>Fenleileix16</li>
      <li>Fenleileix17</li>
      <li>Fenleileix18</li>
      <li>Fenleileix19</li>
      <li>Fenleileix20</li>
      <li>Fenleileix21</li>
      <li>Fenleileix22</li>
      <li>Fenleileix23</li>
      <li>Fenleileix24</li>
      <li>Fenleileix25</li>
      <li>Fenleileix26</li>
      <li>Fenleileix27</li>
      <li>Fenleileix28</li>
      <li>Fenleileix29</li>
      <li>Fenleileix30</li>
      <li>Fenleileix31</li>
      <li>Fenleileix32</li>
      <li>Fenleileix33</li>
      <li>Fenleileix34</li>
      <li>Fenleileix35</li>
      <li>Fenleileix36</li>
      <li>Fenleileix37</li>
      <li>Fenleileix38</li>
      <li>Fenleileix39</li>
      <li>Fenleileix40</li>
      <li>Fenleileix41</li>
      <li>Fenleileix42</li>
      <li>Fenleileix43</li>
      <li>Fenleileix44</li>
      <li>Fenleileix45</li>
      <li>Fenleileix46</li>
      <li>Fenleileix47</li>
      <li>Fenleileix48</li>
      <li>Fenleileix49</li>
      <li>Fenleileix50</li>
      <li>Fenleileix51</li>
      <li>Fenleileix52</li>
      <li>Fenleileix53</li>
      <li>Fenleileix54</li>
      <li>Fenleileix55</li>
      <li>Fenleileix56</li>
      <li>Fenleileix57</li>
      <li>Fenleileix58</li>
      <li>Fenleileix59</li>
      <li>Fenleileix60</li>
      <li>Fenleileix61</li>
      <li>Fenleileix62</li>
      <li>Fenleileix63</li>
      <li>Fenleileix64</li>
      <li>Fenleileix65</li>
      <li>Fenleileix66</li>
      <li>Fenleileix67</li>
      <li>Fenleileix68</li>
      <li>Fenleileix69</li>
      <li>Fenleileix70</li>
      <li>Fenleileix71</li>
      <li>Fenleileix72</li>
      <li>Fenleileix73</li>
      <li>Fenleileix74</li>
      <li>Fenleileix75</li>
      <li>Fenleileix76</li>
      <li>Fenleileix77</li>
      <li>Fenleileix78</li>
      <li>Fenleileix79</li>
      <li>Fenleileix80</li>
      <li>Fenleileix81</li>
      <li>Fenleileix82</li>
      <li>Fenleileix83</li>
      <li>Fenleileix84</li>
      <li>Fenleileix85</li>
      <li>Fenleileix86</li>
      <li>Fenleileix87</li>
      <li>Fenleileix88</li>
      <li>Fenleileix89</li>
      <li>Fenleileix90</li>
      <li>Fenleileix91</li>
      <li>Fenleileix92</li>
      <li>Fenleileix93</li>
      <li>Fenleileix94</li>
      <li>Fenleileix95</li>
      <li>Fenleileix96</li>
      <li>Fenleileix97</li>
      <li>Fenleileix98</li>
      <li>Fenleileix99</li>
      <li>Fenleileix100</li>
    </ul>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  // 组件创建完后调用
  created() {},
  //
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true
    });
    this.scroll.on("scroll", position => {
      // console.log(position);
    });
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  }
};
</script>

<style scoped>
.wrapper {
  height: 180px;
  background: greenyellow;
  overflow: hidden;
  text-align: center;
  color: blue;
}
</style>
