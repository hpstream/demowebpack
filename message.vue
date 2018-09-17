
      <template>
        <div>
            <h1>我是代码</h1>
<div>
    
 <span @click="data1">{{dd1}} </span>
  <span @click="data1">{{dd1}}</span>
</div><details><summary>打开代码</summary>
<pre><code class="language-html">    <wb-cc> 
                        <div slot="footer"><pre class="hljs"><code>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    
 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'data1'</span>&gt;</span>{{dd1}} <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'data1'</span>&gt;</span>{{dd1}}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">data</span>:{
            <span class="hljs-attr">dd1</span>: <span class="hljs-string">"abcee1"</span>
        },
    <span class="hljs-attr">methods</span>:{
        <span class="hljs-attr">data1</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"dd"</span>);
            alert(<span class="hljs-number">0</span>);
        }
    }
 }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre></div>
                    </wb-cc></code></pre>
</details>

        </div>
      </template>

      <script>
      export default {data(){ return {"dd1":"abcee1"} },methods:{data1 : function (){console.log("dd");alert(0);}}}
      </script>
   