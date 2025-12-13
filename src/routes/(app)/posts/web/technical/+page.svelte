<script>
    import Post from "$lib/components/post/post.svelte";
    import TimelineEvent from "$lib/components/timeline/timeline-event.svelte";
    import Timeline from "$lib/components/timeline/timeline.svelte";
    import OldComputerImage from "$lib/assets/posts/web/CDC_6500.jpg";
    import Footnote from "$lib/components/post/footnote.svelte";
</script>

<Post>
    <h1>Notes on a technical history of the internet</h1>
    <p>
        This is primarily about the history of the internet as per the technical
        advancements, investments and decisions that drove the way it functions.
        Note that this is not a new concept and I heavily lent on various
        sources for information which can be found in the references section,
        although I have judiciously curated this list as to what I believe is
        most relevant.
    </p>
    <Timeline>
        <TimelineEvent id="beginning" date="~1960s" title="The beginning">
            {#snippet summary()}
                People experiment with larger networks
            {/snippet}
            <p>
                Computers are large, expensive and slow. They're used for
                engineering or science and at this point it's more likely to
                have one computer serving multiple people than having multiple
                computers. This is a process called time-sharing and it means
                that computing resources can be utilised by people with their
                own terminals as if they did have their own computer.
            </p>
            <figure>
                <img
                    src={OldComputerImage}
                    width="100%"
                    alt="A massive old computer, the CDC 6500"
                />
                <figcaption>
                    An old computer, the CDC 6500. <a
                        href="https://commons.wikimedia.org/wiki/File:CDC_6500.jpg"
                    >
                        From Wikimedia
                    </a>
                </figcaption>
            </figure>
            <p>
                However groups did build their own networks to facilitate
                communication. Since they were adhoc with their own system of
                handling data there had to be a common protocol for
                intercommunication between the different networks. This
                internetwork came to be shortened as the internet.
            </p>
        </TimelineEvent>
        <TimelineEvent id="TCP" date="May 1974" title="The TCP specification">
            {#snippet summary()}
                The internet gets a way to send data (somewhat) reliably
            {/snippet}
            One issue in networking is reliability. This means that when you send
            a message you expect it to actually be sent and not randomly get lost
            which can happen if you just normally send requests. Previously the primary
            way to prevent this was to have the network guarantee reliability by keeping
            track of messages and making sure they arrive as intended. TCP works by
            instead having the sender and receiver send and track messages to ensure
            that messages keep to a few principles:
            <ul>
                <li>Reliable - messages get to where they should</li>
                <li>Ordered - messages arrive in the correct order</li>
                <li>
                    Error-checked - if there are slight discrepancies in the
                    messages they will be found
                </li>
            </ul>
            It also implements congestion controls so that hosts shouldn't use the
            whole network bandwidth.
            <Footnote>
                The history of TCP and IPv4 is interesting but I'm not going to
                go into depth here.
            </Footnote>
        </TimelineEvent>
        <TimelineEvent id="DNS" date="November 1983" title="Domain Name System">
            {#snippet summary()}
                The system for giving names to IP addresses
            {/snippet}
            People aren't going to remember addresses like
            <a href="http://192.0.33.8">192.0.33.8</a> so instead we want a
            system for assigning names to these IP addresses. There used to be a
            method of just having someone update the hosts file with a list of
            all the domains and you would call them by telephone to get them to
            update it. However this is obviously impractical so a new system
            based on distributed servers that map the domain names was created.
            <Footnote>
                Note that the DNS is often a cause of issues, since these have
                to be cached to be scalable and efficient but caching is a
                notoriously difficult problem in computing.
            </Footnote>
        </TimelineEvent>
        <TimelineEvent
            id="www-start"
            date="12 March 1989"
            title="Information Management, a Proposal"
        >
            {#snippet summary()}
                Tim Berners-Lee details a way to organise information at CERN in
                a proposal.
            {/snippet}
            <p>
                Managing information was a problem Tim Berners-Lee was thinking
                about while working at CERN.
                <Footnote>
                    CERN is the European Nuclear research organisation if you're
                    curious. See
                    <a href="https://en.wikipedia.org/wiki/CERN">
                        the wikipedia page
                    </a>
                    for info.
                </Footnote>
                The proposal introduces a bunch of historic things such as noting
                that the organisation is an interconnected "web". It details why hypertext
                is a useful application to the information management problem. It
                uses the term "browser" for a program that accesses the server. Most
                of the principles as detailed in the document are still applicable
                to the web today.
            </p>
            <p>
                It's interesting to think of how things might have gone
                differently. Alternative histories are difficult to imagine
                since we have so much hindsight of seeing the ways things did
                transpire and there's so much chaos in the world that small
                changes could have caused differences in many ways. No doubt
                something would have formed if it wasn't the world wide web.
                However from the proposal:
            </p>
            <blockquote
                cite="https://cds.cern.ch/record/369245/files/dd-89-001.pdf"
            >
                There will always be a large number of information management
                systems... However, we will lose out if we try to constrain
                them, as we will exclude systems and hamper the evolution of
                hypertext in general.
            </blockquote>
            <p>
                I do wonder if the web has essentially monopolised the system of
                the internet. It has been extended to fit every purpose; maybe
                we would be better off having different systems for different
                purposes?
            </p>
        </TimelineEvent>
        <TimelineEvent id="gopher" date="01 April 1991" title="Gopher">
            {#snippet summary()}
                An internet protocol that competes with the web
            {/snippet}
            <p>
                Even though they were coming out at around the same time, the
                Gopher protocol is seen as a pre-web internet system. Looking at
                it now, it looks archaic but so did HTTP
                <Footnote>
                    HTTP is HyperText Transfer Protocol, the protocal for
                    transfering hypertext documents over the web.
                </Footnote> at one point.
            </p>
            <p>
                Gopher servers still exist today, although there aren't many of
                them and the protocol hasn't changed much. There's also
                alternative protocols such as Gemini
            </p>
        </TimelineEvent>
        <TimelineEvent
            id="netscape"
            date="15 December 1994"
            title="Netscape Navigator"
        >
            {#snippet summary()}
                A significant browser enters the fray.
            {/snippet}
            Although there were previous browsers, the Netscape Navigator browser
            is one that grows with and grows the internet itself. Netscape was created
            by Marc Andreessen
            <Footnote>
                You might have heard of him. Probably not for good reasons.
            </Footnote>
            who had worked on the Mosaic browser at NCSA. During development the Netscape
            browser was known as Mozilla, a portmanteau of Mosaic killer but that's
            a teaser for the future. Mosaic had introduced advancements to the web
            basically single-handedly such as the img tag for displaying images on
            the web.
        </TimelineEvent>
        <TimelineEvent
            id="javascript"
            date="18 September 1995"
            title="Javascript"
        >
            {#snippet summary()}
                The web gets a scripting language
            {/snippet}
            <p>
                The people at Netscape realise that Microsoft are going to ship
                some kind of VBScript in their Internet Explorer browser and
                also realise that a scripting language of their own would be a
                really powerful feature that would be compelling for developers
                and users. Unfortunately the language they decided on wasn't
                entirely driven by practical considerations but also commercial
                ones as Netscape had started a deal with Sun Microsystems
                meaning that they wanted a language similar to Sun's Java but
                more suited to the web and thus mostly from Brendon Eich,
                JavaScript was born.
            </p>
            <p>
                Flash forward 30 years and JavaScript is one of the most popular
                programming languages in the world. It's used in many, many
                places far beyond the browser. It powers applicaions, servers
                and more. It is extended to support far more than just the small
                scripting it was initially intended for; people even create
                other programming languages that compile to JavaScript so that
                they can run on the web.
            </p>
        </TimelineEvent>
        <TimelineEvent id="css" date="17 December 1996" title="CSS">
            {#snippet summary()}
                The web gets a way to style elements
            {/snippet}
            <p>
                One advantage of HTML is that it declares the meaning rather
                than just pixels on the screen which means that users can
                display the content in whatever way they want, indeed one of the
                original browsers was a line mode browser and was very simple.
                You can view a simulation of it by CERN
                <a
                    href="https://line-mode.cern.ch/www/hypertext/WWW/TheProject.html"
                >
                    here
                </a>
            </p>
            <p>
                However, people want more than just text and images clumsily
                laid out next to each other without any colours. Therefore there
                needed to be a way for a developer to declare the way they want
                their page to look. If the user wanted to have their own styling
                then they should be able to as well. The language for achieving
                this was CSS or cascading style sheets. It's cascading because
                the styles cascade down the document and is the language for
                laying out and <span class="fancy-style">
                    styling elements.
                </span>
            </p>
        </TimelineEvent>
        <TimelineEvent id="json" date="12 November 2002" title="JSON">
            {#snippet summary()}
                The web gets a data interchange format
            {/snippet}
            <p>
                XML had been the standard way to structure data, it was what
                HTML was based on and seemed to be everywhere. However it did
                have some flaws. One was that it was too complex, another that
                it was too verbose so Douglas Crockford created a minimal format
                based on Javascript called JSON or JavaScript Object Notation.
            </p>
            <p>
                Sometimes its minimalism hurts it in some departments. For
                example when it's used as a configuration language it really
                should have comments and it often allows trailing commas. But as
                a simple, human-readable data format it works great, especially
                since it's easy to use with Javascript, the programming language
                of the web.
            </p>
        </TimelineEvent>
        <TimelineEvent id="whatwg" date="4 June 2004" title="WhatWG">
            {#snippet summary()}
                The browsers get frustrated with W3C and form their own group
            {/snippet}
            The W3C (World Wide Web Consortium) was the custodians of the web standards
            but the browser owners, especially Opera and Mozilla were frustrated by
            slow progress. Thus they formed their own group with an even worse acronym,
            WHATWG (Web Hypertext Application Technology Working Group) which would
            push the development of HTML forward themselves. This shows that while
            web standards may be important; ultimately what's actually implemented
            by the popular browsers is what matters. Furthermore, control over the
            browser market share is equivalent to control over the direction of the
            web.
        </TimelineEvent>
        <TimelineEvent id="iphone" date="29 June 2007" title="iPhone">
            {#snippet summary()}
                The web goes to the phone.
            {/snippet}
            Apple announced the iPhone in 2007 and it quickly became huge, revolutionising
            communications, games, apps, streaming; having enumerable services rely
            on them. It changed the web as it became commonplace to design websites
            around the smaller screen sizes, having to lay things out in a different
            manner.
        </TimelineEvent>
        <TimelineEvent
            id="browser-wars-2"
            date="2 September 2008"
            title="Google Chrome"
        >
            <p>
                The browser wars were back and this time it was Google wanting
                to take over the browser market. The benefits of this to them
                are enormous since they can serve Google as the default search
                engine and also push the web towards a direction more amenable
                to their interests which are many since they want to make and
                support complex web applications such as Google Docs/Excel,
                whereas someone like Microsoft might prefer to keep Microsoft
                Office/Excel the main application people use.
            </p>
            <p>
                With Google Chrome, they focus heavily on performance, keeping
                memory usage low. They make Javascript run faster with the V8
                Javascript engine. With all these features as well as heavy
                promotion on their dominant search engine, Chrome comes to be
                the biggest browser in the space.
            </p>
        </TimelineEvent>
        <TimelineEvent id="flash-death" date="July 2017" title="Flash dies">
            {#snippet summary()}
                Adobe's Flash finally is killed off
            {/snippet}
            <p>
                Flash was added as plugins to the browser and during the early
                2000s was a pivotal part of the web, especially as part of
                games, animations and applications. However just as Java applets
                were once killed off, so was Adobe Flash. Probably the key point
                was Apple refusing to have Flash on their iPhones for a few
                reasons explained in
                <a
                    href="https://web.archive.org/web/20170615060422/https://www.apple.com/hotnews/thoughts-on-flash/"
                >
                    this document written by Steve Jobs in 2010
                </a>
                Ultimately it was killed off but you can still view old Flash content
                through emulators such as
                <a href="https://ruffle.rs/"> Ruffle </a>
            </p>
            <p>
                This saga shows how even though backwards compatibility is one
                of the web's principles, it doesn't come above some of the
                others. The security issues and propriety nature meant that
                Flash was doomed even though it did help to define what web
                applications could be.
            </p>
        </TimelineEvent>
    </Timeline>
</Post>
<ul>
    <h3>References</h3>
    <li>
        <a href="https://thehistoryoftheweb.com/timeline/">
            The history of the web - a cool timeline of important events
        </a>
    </li>
    <li>
        <a href="https://en.wikipedia.org/wiki/History_of_the_Internet">
            Wikipedia - history of the internet
        </a>
    </li>
    <li>
        <a href="https://en.wikipedia.org/wiki/History_of_the_World_Wide_Web">
            Wikipedia - history of the world wide web
        </a>
    </li>
    <li>
        <a href="https://cds.cern.ch/record/369245/files/dd-89-001.pdf">
            Information Management, a Proposal by Tim Berners-Lee
        </a>
    </li>
</ul>

<style>
    .fancy-style {
        background-image: linear-gradient(45deg, green, red);
        background-clip: text;
        color: transparent;
    }
</style>
