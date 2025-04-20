window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');

    setTimeout(() => {
        if (pre) pre.classList.add('hidden');
        document.body.classList.add('fade-in');
    }, 1000);
});
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('a[href$=".html"],nav a').forEach(link=>{
        link.addEventListener('click',function(e){
            const url=this.getAttribute('href');
            if(url&&!url.includes('#')){
                e.preventDefault();
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');
                setTimeout(()=>window.location=url,400);
            }
        });
    });
    const obs=new IntersectionObserver((entries,o)=>{
        entries.forEach(en=>{
            if(en.isIntersecting){
                en.target.classList.add('visible');
                o.unobserve(en.target);
            }
        });
    },{threshold:0.1});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    document.querySelectorAll('.post').forEach(post=>{
        post.querySelector('.post-header').addEventListener('click',()=>{
            post.classList.toggle('open');
        });
    });
});