const specialIdentifierMap: Map<string, string> = new Map();

// greek alphabet
specialIdentifierMap.set("alpha", "α");
specialIdentifierMap.set("beta", "β");
specialIdentifierMap.set("gamma", "γ");
specialIdentifierMap.set("delta", "δ");
specialIdentifierMap.set("epsilon", "ε");
specialIdentifierMap.set("zeta", "ζ");
specialIdentifierMap.set("eta", "η");
specialIdentifierMap.set("theta", "θ");
specialIdentifierMap.set("iota", "ι");
specialIdentifierMap.set("kappa", "κ");
specialIdentifierMap.set("lambda", "λ");
specialIdentifierMap.set("mu", "μ");
specialIdentifierMap.set("nu", "ν");
specialIdentifierMap.set("xi", "ξ");
specialIdentifierMap.set("omicron", "ο");
specialIdentifierMap.set("pi", "π"); // important
specialIdentifierMap.set("rho", "ρ");
specialIdentifierMap.set("sigma", "σ");
specialIdentifierMap.set("tau", "τ");
specialIdentifierMap.set("upsilon", "υ");
specialIdentifierMap.set("phi", "φ");
specialIdentifierMap.set("chi", "χ");
specialIdentifierMap.set("psi", "ψ");
specialIdentifierMap.set("omega", "ω");

// upper case greek alphabet
specialIdentifierMap.set("u_alpha", "Α");
specialIdentifierMap.set("u_beta", "Β");
specialIdentifierMap.set("u_gamma", "Γ");
specialIdentifierMap.set("u_delta", "Δ");
specialIdentifierMap.set("u_epsilon", "Ε");
specialIdentifierMap.set("u_zeta", "Ζ");
specialIdentifierMap.set("u_eta", "Η");
specialIdentifierMap.set("u_theta", "Θ");
specialIdentifierMap.set("u_iota", "Ι");
specialIdentifierMap.set("u_kappa", "Κ");
specialIdentifierMap.set("u_lambda", "Λ");
specialIdentifierMap.set("u_mu", "Μ");
specialIdentifierMap.set("u_nu", "Ν");
specialIdentifierMap.set("u_xi", "Ξ");
specialIdentifierMap.set("u_omicron", "Ο");
specialIdentifierMap.set("u_pi", "Π");
specialIdentifierMap.set("u_rho", "Ρ");
specialIdentifierMap.set("u_sigma", "Σ");
specialIdentifierMap.set("u_tau", "Τ");
specialIdentifierMap.set("u_upsilon", "Υ");
specialIdentifierMap.set("u_phi", "Φ");
specialIdentifierMap.set("u_chi", "Χ");
specialIdentifierMap.set("u_psi", "Ψ");
specialIdentifierMap.set("u_omega", "Ω");

// others
specialIdentifierMap.set("infinity", "∞");
specialIdentifierMap.set("middot", "·"); // interpunct
specialIdentifierMap.set("degrees", "°");

export function getSpecialValue(value: string): string | null {
    if (specialIdentifierMap.has(value)) {
        return specialIdentifierMap.get(value)!;
    }
    return null;
}
